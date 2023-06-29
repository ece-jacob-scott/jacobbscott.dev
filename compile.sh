#! /bin/bash

blogs_md=$(find ./src/blogs -type f)

# compile blogs to html

for file in $blogs_md
do
    source=$file
    output=$(echo $source | xargs -I% basename % .md | xargs -I% echo "./blogs/%.html")

    pandoc -s $source -o $output --css /css/blog_styles.css --highlight-style espresso
done

# compile blog-index.html