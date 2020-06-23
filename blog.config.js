/**
 * Javascript object with information about blog articles used to create static
 * blog pages
 */

import path from "path";

export default {
  blogs: [
    {
      title: "Test Blog Post",
      date: new Date("2020/06/19"),
      description: "This article is being used to test the build system.",
      path: path.resolve("./src/blogs/2020/test.md"),
    },
    {
      title: "Creating a Statically Generated Blog with Rollup",
      date: new Date("2020/06/23"),
      description:
        "This page you're viewing right now was hand made with care by me using simple frontend tools I had to learn from scratch! To see the full story and read about the journey of building my own static site generator for github pages then click the link ->",
      path: path.resolve("./src/blogs/2020/blog_creation.md"),
    },
  ],
};
