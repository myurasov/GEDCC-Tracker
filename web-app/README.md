<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Predix Knowledge Graph Demo – Web App](#predix-knowledge-graph-demo-web-app)
	- [Requirements](#requirements)
	- [Installation](#installation)
	- [Development](#development)
		- [Live Reload](#live-reload)
		- [Building](#building)
		- [Available Gulp Tasks](#available-gulp-tasks)

<!-- /TOC -->

# Predix Knowledge Graph Demo – Web App

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

### Available Gulp Tasks

|Command|Descrition|
|:--|:--|
|`gulp cleanup`|Remove build files|
|`gulp serve` _(default)_|Launch with live reload|
|`gulp set-environment:<env>`|Set environment to `<env>` \*|
|`gulp update-revision`|Update current revision based on the git commit or date/time \**|
|`gulp build:<env>`|Build for the `<env>` environment|
|`gulp compile-ejs`|Compile EJS files|
|`gulp compile-sass`|Compile SASS files|
|`gulp compile-scripts`|Compile scripts. Creates self-sufficient bundle (except for `development` environment)|
|`gulp compile-templates`|Compile templates into cache. In `development` environment templates are not cached.|
|`gulp optimize-asssets`|Optimize assets|
|`gulp post-build`|Perform post-build steps|

\* Current environment is stored in `/environment` file

\** Current revision is stored in `/revison` file
