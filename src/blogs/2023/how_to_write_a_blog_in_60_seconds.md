# How to write a blog in 60 seconds! (A step by step tutorial)

## Step 1: Procrastination (3 years)

The first step in any successful project is to start with great intentions,
overestimate the amount of work required, and then procrastinate for three
years.

Now that you've come back to the project it's time to get rid of all the work
that you put into the project before and start over.

## Step 2: Research (2 hours)

You know you don't want to write a blog using HTML because you're not a sadist
but writing your own tool to compile markdown is how you got stuck in step 1.
The next logical step is to find someone who did the work already and steal
that. [This looks good enough](https://pandoc.org/demos.html)!

Now you have an HTML page from your markdown, but it looks like crap. Let's add
some css!

```{#mycode .bash}
pandoc -s ... -o ... --css ... --highlight-style espresso
```

## Step 3: Creating an index page (2 hours)

Okay we have a tool that can turn our markdown musings into a functional HTML
page, great. Now we need a page that people can go to to see what blogs we've
written! Do we want to create this blog page ourselves every time we write a
blog? Of course not, that would be silly.

I bet we could do this only using bash utilities...

hmmmm

```{#find-start .bash}
find ... -type f
```

okay now I just need to parse the names of the files...

```{#find-start .bash}
find ... -type f | xargs -I% basename % .md | tr '_' ' '
```

easy enough, now we need to put these file names into a link on a webpage...
