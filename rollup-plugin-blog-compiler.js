/**
 * Source blog files: "./src/blogs/{year}/{file_name}.md"
 * Generated blog files: "./blogs/{year}/{file_name}.html"
 * Template blog file: "./templates/blog_template.html"
 * Blog config file: "./blog.config.js"
 * Blog index page: "./blogs/index.html"
 *
 * Description:
 * Looks for posts in the buildStart hook and adds them to a "global" array
 * then in the generateBundle hook it generates the html files. To generate html
 * files the plugin finds the template file and replaces the tag
 * "<content-here></content-here>" with the generated html from the markdown
 * files.
 *
 * Future Consideration:
 * - The plugin should create year folders that don't exist yet if it's in the
 *   "src" directory.
 * - Look for future considerations to perfermence such as using pipes for all
 *   the file writing/reading/transforming. Since this is a build step plugin
 *   the performance doesn't really matter.
 * - Add options to specify the paths to files.
 * - Find a better solution to using the blogs global
 */

import fs from "fs";
import marked from "marked";
import { promisify } from "util";
import config from "./blog.config";
import path from "path";

const readFileProm = promisify(fs.readFile);
const writeFileProm = promisify(fs.writeFile);

let blogs = [];

/**
 * Takes a blog config element and creates an element to display on the blog
 * home page.
 */
const blogIndexElement = ({ title, date, description, path }) => {
  return `
    <p><a href="/blogs/${date.getFullYear()}/${title
    .toLowerCase()
    .split(" ")
    .join("_")}.html">${title}</a>: ${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}</p>
  `;
};

export default {
  name: "blog-compiler",
  buildStart: async function (options) {
    blogs = config.blogs;
    // watch all the blog files for changes
    for (const blog of blogs) {
      this.addWatchFile(blog.path);
    }
  },
  generateBundle: async function (options, bundle, isWrite) {
    /**
     * Variables used throughout execution
     * - writeOps: used to keep writing operations to Promise.all at the end
     * - blogTemplate: template html page for a blog entry
     * - blogIndexTemplate: template html page for the blog index page
     */
    const writeOps = [];
    const blogTemplate = await readFileProm(
      path.resolve("./templates/blog_template.html")
    );
    const blogIndexTemplate = await readFileProm(
      path.resolve("./templates/blog_home.html")
    );

    // Transform config objects into the content for the index page
    const indexContent = blogs.map(blogIndexElement).join("\n");

    // Create a writing promise and push it on the writeops stack
    writeOps.push(
      writeFileProm(
        path.resolve("./blogs/index.html"),
        blogIndexTemplate
          .toString()
          .replace("<content-here></content-here>", indexContent, {
            flag: "w+",
          })
      )
    );

    // Create all the blog pages from the config objects
    // NOTE: blogs is populated with blog configs because the buildStart
    //       function runs before the generateBundle function
    for (const blog of blogs) {
      const blogPath = blog.path;
      // get the blog content in markdown
      const contentMD = (await readFileProm(blogPath)).toString();
      // replace the blog template with blog content after converting it into
      // html from markdown
      const contentHTML = blogTemplate
        .toString()
        .replace("<content-here></content-here>", marked(contentMD));

      const blogURL = path.resolve(
        `./blogs/${blog.date.getFullYear()}/${blog.title
          .toLowerCase()
          .split(" ")
          .join("_")}.html`
      );
      writeOps.push(writeFileProm(blogURL, contentHTML, { flag: "w+" }));
    }
    await Promise.all(writeOps);
  },
};
