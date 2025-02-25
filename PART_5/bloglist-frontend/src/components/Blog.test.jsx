import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import AddBlog from "./AddBlog.jsx";
import userEvent from "@testing-library/user-event";

const blogs = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: "Jane Doe",
    url: "https://example.com/js-closures",
    likes: 15,
    user: { username: "hadao4" },
  },
];
const user = { username: "hadao4", name: "Hadao", password: "3432" };

test("renders blog title and author", () => {
  render(<Blog blogs={blogs} user={user} />);
  // Using regex matcher (optional) if the text might be split or has casing issues
  const element = screen.getByText(/Understanding JavaScript Closures/i);
  expect(element).toBeInTheDocument();
});

test("clicking the button to show likes and url ", async () => {
  const users = userEvent.setup();
  const { container } = render(<Blog blogs={blogs} user={user} />);
  const btn = container.querySelector(".view-button");
  await users.click(btn);

  // screen.debug();

  const urlElement = screen.getByText((content, element) =>
    content.includes("https://example.com/js-closures")
  );
  const likesElement = screen.getByText((content, element) =>
    content.includes("Likes: 15")
  );

  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
});

test("clicking the button calls event handler twice", async () => {
  const mockHandler = vi.fn();

  const { container } = render(
    <Blog blogs={blogs} user={user} onUpdate={mockHandler} />
  );
  const users = userEvent.setup();
  const btn = container.querySelector(".view-button");
  await users.click(btn);

  const likeBtn = container.querySelector(".like-btn");
  await users.click(likeBtn);
  await users.click(likeBtn);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<AddBlog /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const users = userEvent.setup();

  const { container } = render(<AddBlog onAdd={createBlog} />);

  const title_input = container.querySelector("#title");
  const author_input = container.querySelector("#author");
  const url_input = container.querySelector("#url");
  const sendButton = container.querySelector("#create-btn");
  // console.log(sendButton);
  await users.type(title_input, "Understanding JavaScript Closures");
  await users.type(author_input, "Jane Doe");
  await users.type(url_input, "https://example.com/js-closures");
  await users.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Understanding JavaScript Closures"
  );
  // console.log(createBlog.mock.calls[0][0]);
});
