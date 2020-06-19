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
      title: "Test Blog Post 2",
      date: new Date("2020/06/19"),
      description: "This article is being used to test the build system.",
      path: path.resolve("./src/blogs/2020/test.md"),
    },
  ],
};
