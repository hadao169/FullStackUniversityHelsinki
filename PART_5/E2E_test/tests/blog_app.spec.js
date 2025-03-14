import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper.js";
test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Dao Ha",
        username: "admin",
        password: "admin",
      },
    });

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Dao Ha 2",
        username: "admin123",
        password: "admin123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Enter your login credentials")).toBeVisible();
  });

  test.describe("Login", () => {
    test("Successfully with correct credentials", async ({ page }) => {
      await loginWith(page, "admin", "admin");
      await expect(page.getByText("Dao Ha logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "wrong", "wrong");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Username or password is incorrect");
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "admin");
    });

    test("a new blog can be created", async ({ page }) => {
      const blog = {
        title: "Batman",
        author: "Marvel Studio",
        url: "https://fullstackopen.com/en/part5/end_to_end_testing_playwright#exercises-5-17-5-23",
      };
      await createBlog(page, blog);
      await expect(
        page.getByText("A new blog Batman by Marvel Studio added!")
      ).toBeVisible();
    });

    test.describe("When a blog is added", () => {
      test.beforeEach(async ({ page }) => {
        const blog = {
          title: "Batman",
          author: "Marvel Studio",
          url: "https://fullstackopen.com/en/part5/end_to_end_testing_playwright#exercises-5-17-5-23",
        };
        await createBlog(page, blog);
      });

      test("Can like the blog", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        await page.getByRole("button", { name: "Like" }).click();
        const like = page.locator(".likes > p");
        await expect(like).toContainText("Likes: 1");
      });

      test("Remove a blog by loggod-in user", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        await page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Remove" }).click();
      });

      test.describe("Remove button visibility", () => {
        test("Owner can see the button", async ({ page }) => {
          await page.getByRole("button", { name: "View" }).click();
          await expect(page.locator('button:has-text("Remove")')).toBeVisible();
        });

        test("Not owner can not see the button", async ({ page }) => {
          await page.getByRole("button", { name: "Sign out" }).click();
          await loginWith(page, "admin123", "admin123");
          await page.getByRole("button", { name: "View" }).click();
          await expect(
            page.locator('button:has-text("Remove")')
          ).not.toBeVisible();
        });
      });
    });

    test.describe("test sort function", () => {
      test.afterEach(async ({ page }) => {
        await page.getByRole("button", { name: "Sign out" }).click();
      });

      test("Blogs are sorted by the number of likes in descending order", async ({
        page,
      }) => {
        const BLOGS = [
          {
            title: "The Future of Automation Engineering",
            author: "John Doe",
            url: "https://example.com/future-of-automation",
          },
          {
            title: "Web Development Trends in 2025",
            author: "Jane Smith",
            url: "https://example.com/web-dev-trends-2025",
          },
          {
            title: "Mastering Virtualization with VMware and KVM",
            author: "Alex Johnson",
            url: "https://example.com/mastering-virtualization",
          },
        ];

        await createBlog(page, BLOGS[0]);
        await createBlog(page, BLOGS[1]);
        await createBlog(page, BLOGS[2]);

        const blogs = page.locator(".blog");

        // Open all blogs
        for (let i = 0; i < 3; i++) {
          await blogs.nth(i).getByRole("button", { name: "View" }).click();
        }

        // Like blogs with increasing likes
        for (let i = 0; i < 3; i++) {
          const clicks = i + 1;
          for (let j = 0; j < clicks; j++) {
            await blogs.nth(i).getByRole("button", { name: "Like" }).click();
          }
        }

        // Verify sorting by likes
        const likes = await blogs.allTextContents();
        const sortedLikes = likes
          .map((text) => parseInt(text.match(/Likes: (\d+)/)[1], 10))
          .slice(0, 3); // Extract likes and ensure we only have 3 blogs
        const isSorted = sortedLikes.every(
          (val, i, arr) => !i || val <= arr[i - 1]
        );
        expect(isSorted).toBeTruthy();
      });
    });
  });
});
