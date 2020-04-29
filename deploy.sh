#!/usr/bin/env sh

# abort on errors
set -e

yarn docs:build

cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:netcz/vue-pikaday.git master:gh-pages
