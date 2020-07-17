/**
 * Javascript object with information about blog articles used to create static
 * blog pages
 */

import path from "path";

export default {
  blogs: [
    {
      title: "Creating a Statically Generated Blog with Rollup",
      date: new Date("2020/07/17"),
      description:
        "This page you're viewing right now was hand made with care by me using simple frontend tools! To see the full story and read about how I built my own static site generator for github pages then click the link ->",
      path: path.resolve("./src/blogs/2020/blog_creation.md"),
    },
  ],
};
