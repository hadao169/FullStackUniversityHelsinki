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
    });
  });
});
