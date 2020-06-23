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
import crypto from "crypto";
import glob from "glob";

const readFileProm = promisify(fs.readFile);
const writeFileProm = promisify(fs.writeFile);
const unlinkProm = promisify(fs.unlink);
const globProm = promisify(glob);

let blogs = [];
const blogTemplatePath = path.resolve("./templates/blog_template.html");
const blogHomeTemplatePath = path.resolve("./templates/blog_home.html");

/**
 * Takes a blog config element and creates an element to display on the blog
 * home page.
 */
const blogIndexElement = ({ title, date, description, path }, hash) => {
  return `
    <p><a href="/blogs/${date.getFullYear()}/${title
    .toLowerCase()
    .split(" ")
    .join("_")}-${hash}.html">${title}</a>: ${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}</p>
  `;
};

/**
 * Takes the blog config object and a hash then makes the file path for the new
 * html file
 */
const createURL = ({ title, date, description }, hash) => {
  return path.resolve(
    `./blogs/${date.getFullYear()}/${title
      .toLowerCase()
      .split(" ")
      .join("_")}-${hash}.html`
  );
};

export default {
  name: "blog-compiler",
  buildStart: async function (options) {
    blogs = config.blogs;
    const blogFiles = await globProm("./blogs/**/*");
    const deleteOps = [];
    for (const oldFile of blogFiles) {
      if (oldFile.includes(".html")) {
        deleteOps.push(unlinkProm(oldFile));
      }
    }
    // watch all the blog files for changes
    for (const blog of blogs) {
      this.addWatchFile(blog.path);
    }
    await Promise.all(deleteOps);
  },
  generateBundle: async function (options, bundle, isWrite) {
    /**
     * Variables used throughout execution
     * - writeOps: used to keep writing operations to Promise.all at the end
     * - blogTemplate: template html page for a blog entry
     * - blogIndexTemplate: template html page for the blog index page
     */
    const writeOps = [];
    const blogTemplate = (await readFileProm(blogTemplatePath)).toString();
    const blogHomeTemplate = (
      await readFileProm(blogHomeTemplatePath)
    ).toString();
    const blogIndexes = [];

    // build blog pages
    for (const blog of blogs) {
      const md5Hash = crypto.createHash("md5");
      const blogContentMD = (await readFileProm(blog.path)).toString();
      const blogContentHTML = blogTemplate.replace(
        "<content-here></content-here>",
        marked(blogContentMD)
      );
      md5Hash.update(blogContentHTML);
      const hash = md5Hash.digest("hex");
      const blogURL = createURL(blog, hash);
      writeOps.push(writeFileProm(blogURL, blogContentHTML, { flag: "w+" }));
      blogIndexes.push(blogIndexElement(blog, hash));
    }

    const indexPageHTML = blogHomeTemplate.replace(
      "<content-here></content-here>",
      blogIndexes.join("\n")
    );

    writeOps.push(
      writeFileProm(path.resolve("./blogs/index.html"), indexPageHTML, {
        flag: "w+",
      })
    );

    await Promise.all(writeOps);
  },
};
