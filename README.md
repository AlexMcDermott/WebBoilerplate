# TypeScript Boilerplate

Boilerplate for TypeScript canvas/WebGL projects.

## Linting

- Works with TypeScript and Markdown using [TSLint](https://github.com/palantir/tslint) and [MarkdownLint CLI](https://github.com/igorshubovych/markdownlint-cli)
- Both run on pre-commit with [Husky](https://github.com/typicode/husky)

## Formatting

- Uses [Prettier](https://github.com/prettier/prettier) for consistent styling
- Also runs on pre-commit with [Husky](https://github.com/typicode/husky)

## Bundling

- [Parcel](https://github.com/parcel-bundler/parcel) live-reload server runs on `npm start`
- Builds to dist folder for use with gh-pages

## Deploying

- Uses [gh-pages](https://github.com/tschaub/gh-pages) to automatically deploy dist folder to gh-pages branch
- Uses [git-branch-is](https://github.com/kevinoid/git-branch-is) to only deploy when pushing to the master branch

## Canvas

- Includes [P5.js](https://github.com/processing/p5.js) as a Javascript canvas library
- Includes [dat.gui](https://github.com/dataarts/dat.gui) for user interface and live updating of parameters

## WebGL

- Includes [twgl.js](https://github.com/greggman/twgl.js) as a WebGL wrapper
- Comes with [gl-matrix](https://github.com/toji/gl-matrix) for vector operations in JavaScript
