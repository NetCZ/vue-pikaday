#!/usr/bin/env sh

# abort on errors
set -e

yarn docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:NetCZ/vue-pikaday.git master:gh-pages
