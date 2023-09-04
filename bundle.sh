#!/usr/bin/bash

# Delete existing bundled folder
rm -rf ika

# make directories
mkdir -p ika/dist

# import html
cp *.html ika/

# import css
cp *.css ika/

# import js
cp dist/*.js ika/dist
