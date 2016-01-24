## Angular Sails Auth Client  - angularjs frontend for authentication w/ sails starter
Angular Sails Auth Client  is the frontend side, starter for authentication with sails.js.
Angular theme using [Versatile Dashboard](https://github.com/start-angular/versatile-dashboard-theme/).

## Requirements
Made to be used with [Angular Sails Auth Server](https://github.com/zellpod/Example-Angular-Sails-Auth-Server).

## Installation
1. Clone this project or Download that ZIP file
2. Make sure you have [bower](http://bower.io/), [gulp](https://www.npmjs.com/package/gulp) and  [npm](https://www.npmjs.org/) installed globally
3. On the command prompt run the following commands
- cd `project-directory`
- `bower install`
- `npm install`
-  change server url at config/development.json and config/production.json
- `gulp serve --env development` - For development mode
- `gulp serve --env production` - For production mode
- `gulp build` - concat, minify and generate the files for deployment
