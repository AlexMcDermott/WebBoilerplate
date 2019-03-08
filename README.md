# TypeScript Boilerplate

Boilerplate for TypeScript canvas projects.

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

- Uses [gh-pages](https://github.com/tschaub/gh-pages) to automatically deploy to Github Pages
- Deploys dist folder to gh-pages branch on pre-push
