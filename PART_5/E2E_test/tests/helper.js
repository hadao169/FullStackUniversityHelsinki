const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByLabel("Title").fill(blog.title);
  await page.getByLabel("Author").fill(blog.author);
  await page.getByLabel("URL").fill(blog.url);
  await page.getByRole("button", { name: "Create" }).click();
};

export { loginWith, createBlog };
