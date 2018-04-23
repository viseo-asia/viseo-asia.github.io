# Viseo Asia Innovation Labs Blog

## Developer Setup

- `npm install -g gatsby`
- `git clone git@github.com:viseo-asia/viseo-asia.github.io.git`
- Always work on the *develop* branch - never *master*
- `cd viseo-asia.github.io`
- `npm install`
- `gatsby develop`
- open [http://localhost:8000/](http://localhost:8000/)
- Create blog posts in the *pages* directory (follow the dated name format)

## Deploy

Deployment will build the static site on the *master* branch and push it to github.

- `npm run deploy`