# GEDCC Web App

## Requirements

|Dependency|OS X Installation|
|:--|:--|
|Node.js (0.12+)|`brew install nodejs`|
|gulp|`npm install -g gulp`|
|jspm|`npm install -g jspm`|

## Installation

```bash
git clone <repository url> <project dir>
cd <project dir>
npm i && jspm i
gulp serve
```

## Development

### Live Reload

`gulp serve`

### Building

`gulp build:<environment>`

Where `<environment>` is one of the following:
- `development`
- `test`
- `staging`
- `production`

### Deployment

To build for production environment and deploy to CloudFoundry:
 
```bash
gulp build:production && (cd src/web && cf push)
```

After the build the app can be served from `src/app` directory.

