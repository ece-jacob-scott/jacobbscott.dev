const fs = require("fs");
const marked = require("marked");

const readDirProm = (path) =>
  new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        rej(err);
      }
      res(files);
    });
  });

const readFileProm = (path) =>
  new Promise((res, rej) => {
    fs.readFile(path, (err, file) => {
      if (err) {
        rej(err);
      }
      res(file.toString());
    });
  });

let posts = [];
const year = new Date().getFullYear();
const blog_src = `./src/blogs/${year}`;

export default {
  name: "blog-compiler",
  buildStart: async function (options) {
    posts = await readDirProm(blog_src);
    for (const post of posts) {
      this.addWatchFile(`${blog_src}/${post}`);
    }
  },
  generateBundle: async function (options, bundle, isWrite) {
    const template = await readFileProm("./blog_template.html");
    //console.log(template.replace("<content-here></content-here>", "hahaha"));
    const content = [];
    for (const post of posts) {
      const content_md = await readFileProm(`${blog_src}/${post}`);
      const content_html = template.replace(
        "<content-here></content-here>",
        marked(content_md)
      );
      const post_url = `./blogs/${year}/${post.replace(".md", "")}.html`;
      content.push(
        new Promise((res, rej) => {
          fs.writeFile(post_url, content_html, { flag: "w+" }, (err) => {
            if (err) {
              rej(err);
            }
            res();
          });
        })
      );
    }
    await Promise.all(content);
  },
};
