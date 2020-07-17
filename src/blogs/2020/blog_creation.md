# Creating a Statically Generated Blog

## Project Introduction

With the time between finishing my computer engineering degree and starting my
first real adult job I decided to work on a personal website and one of the
features that I really wanted was a blog.

## Starting the Project

This is going to be a step by step guide on how to make a statically generated
site with different pages. This post is going to bring you through the trails
and turbulation that I encountered while adding this feature to my site.

The first problem was how to work around my hosting method, as you can probably
tell this site is currently hosted using github pages. I love this feature of
github for easy, free, and flexible website hosting. However, the only thing
github pages does is serve static files from a github repo, which is perfect for
most simple sites but I wanted to add some dynamic content with blogs. This left
me with only one option which was to generate the dynamic content beforehand.

Enter Rollup and the pandora's box that is frontend build tools. I had worked
with simple build tools as an earlier developer working for my college but only
tangentially never needing to go deep into their functions. I used webpack back
then and loathed the experience everytime I needed work the config, so upon the
high praise given by the http 203 podcast I decided to work with Rollup. This
turned out to be the best decision of the project and will be using Rollup in
the future!

## Introducing Rollup Custom Plugins

The main site only uses a single javascript function for toggling the collapse
elements so I don't really have a use of the main packaging functionality of
Rollup for now. However, I do have a need for the simple plugin integration that
Rollup offers.

```javascript
export default {
  name: "blog-compiler",
  buildStart: async function (options) { ... },
  generateBundle: async function (options, bundle, isWrite) { ... },
};
```

This is all a custom Rollup plugin is, just an object with a name and some
functions that get run at different points in the build process. This makes for
a very easy jumping off point for the static site generator.

## Repo Structure and Config Files

To keep the repo relativily well organized I went through many different ways of
organizing the blog files. My first instinct was to have implicit folders where
the blogs markdown files lived and just have the plugin look in only those
folders. This approach was decent and allowed me to start implimenting the
actual functionality early on but as I kept thinking about adding more features
such as description snippets, header images, etc. I realized that this approach
was lacking. I ended up implementing a blog config file which will define all
the posts as objects.

```javascript
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
```

Here you can see the blog object used to generate this page, it has a short
description that's added to the index page, the date of publication, title, and
path to the markdown file. This approach is great because it is very extensible,
in the future if I wanted to I could add a header image by just adding a
property to the blog object which points to an image and add that image to the
index page. The only downside to this is that it adds one more config file to
keep track of but I think the benefits of being able to add features on demand
far outweighs the extra upkeep.

## Conclusion of features

I've given you a very short overview of the technical design and decisions I
made while creating this blogging feature if you wanted to look at the code
this whole site is on my [public github]("https://github.com/ece-jacob-scott").
In the future I think it would be neat to have a cover photo for each blog, in
the same vein as a medium article. For a simple blogging application I think
this is a great start and I'm proud of the design and implementation.

## Retrospection/Conclusion

For right now I believe this blogging feature works very well for me and
hopefully it will inspire to write more about my projects as I continue
developing. I will try and keep a list of features that I add in future to
hopefully write an updated blog on later. If you have any questions or
comments tweet at [me]("https://twitter.com/frodos_brother") :). Thank you for
reading my first blog I promise I will get better in the future.
