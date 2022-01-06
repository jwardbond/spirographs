# spirographs
Yes. Currently there are no spirographs. This is just a simple paper.js project that is easily deployed to github pages.
## Website
https://always-learn.com/spirographs/
## Steps to use
1. Change metadata in package.json
1. `npm init -y`
1. `npm install` to get dependencies
After editing the files in src/ to your liking, you can run
2. `npm run start` uses [parcel](https://parceljs.org/) start local live server
3. `npm run build` uses [parcel](https://parceljs.org/) to build the project in `dist` for deployment
4. `npm run deploy` uses [gh-pages](https://github.com/tschaub/gh-pages) to deploy `dist/` to the gh-pages branch of whatever repo is specified in `package.json`