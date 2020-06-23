# Creating a Statically Generated Blog with Rollup

## Project Introduction

In pursuit of a future career in developer relations I decided I should start a 
blog where I can muse about projects that I have been working on or 
investigations into new technologies. Since I already have a basic portfolio 
site hosted on github pages I figured it should be simple just add a blogging
section, as usual it turned out to be a little more of pain than I originally
thought. The first struggle was getting some traction with frontend development.
Most of my developer experience has been spent on working with server side node
code using express, which made this project start with a bit of a learning
curve. For tools I decided to use rollup for the build step because I've heard
good things over the years. Then for languages I kept it simple with standard
HTML5, CSS, and plain javascript because I didn't want to overcomplicate the
project. 

## Goals for the Project

The goals of the project are very simple I want to be able to write blogs in
markdown and I want to serve the all the files using github pages. The blogs
also need an index page to display all the posts and have a description for
each for people to search through. These are all the basic goals that I had for
a simple version of the blog application. 

## Building the Application

Since I want to use github pages which only does static site hosting I need to 
make a custom rollup plugin to handle buidling the html pages from the markdown
blog entries. This was really easy because the rollup docs are amazing and they
made it really easy to create your own custom plugin. To handle the mardown to
HTML conversion I used an npm package called marked. 