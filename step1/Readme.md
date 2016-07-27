# Pip.WebUI Getting Started <br/> Step 1. Create application structure

#### Prerequisite: Node.js

Install Node.js® and npm if they are not already on your machine.

Verify that you are running at least node v4.x.x and npm 3.x.x or older by running node -v and npm -v in a terminal/console window.

#### Let's build application:

Create `package.json` file in root of project with such code:

```javascript
{
  "name": "SampleApplication",
  "version": "1.0.0",
  "author": "Author",
  "description": "Sample of application using pipWebUI components",
  "contributors": [
    {
      "name": "<contributor_name>",
      "email": "<contributor_email>"
    }
  ],
  "keywords": [
    "sample",
    "pipWebUI"
  ],
  "noAnalyze": true,
  "license": "Commercial",
  "private": true,
  "scripts": {
    "build": "gulp build",
    "lint": "gulp lint",
    "samples": "gulp launch",
    "test": "karma start"
  },
  "dependencies": {
  },
  "devDependencies": {
    "pip-webui": "git+https://github.com/pip-webui/pip-webui-all.git",
    "pip-webui-tasks": "git+https://github.com/pip-webui/pip-webui-tasks.git"
  }
}

```

Create `gulpfile.js`, where will use standard gulp-tasks from **pip-webui-tasks** module:

```javascript
var gulp = require('gulp');

// Add standard tasks    
require('pip-webui-tasks').all();

// Define build tasks        
gulp.task('build', ['build-dev', 'build-prod']);
gulp.task('rebuild', ['build-dev']);

// Set default task
gulp.task('default', ['build']);
```

More information about standard gulp-tasks from **pip-webui-tasks** module you can find [here](https://github.com/pip-webui/pip-webui-tasks).

Create `build.conf.js`, where will configure build tasks

```javascript
module.exports = {
    module: {
        name: 'SampleApplication',
        index: 'sample'
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: true
    },
    file: {
        import: [
            'node_modules/pip-webui/dist/**/*'
        ]
    }
};
```

Before install packages install global gulp

```
npm install gulp -g && npm install gulp --save-dev
```

and then install dependencies

```
npm install
```

Run default gulp task

```
gulp
```

After the task, in root of project will appear folder `/lib`, in which will be copied dist files of pipWebUI components and external libraries

Create `/src` folder in root of project and create such files inside:

###### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PipWebUI Sample Application</title>
</head>
<body>

</body>
</html>
```

###### `index.js`

```javascript
(function () {
    
})();
```

Don't forget to add link to `index.js` in your `index.html`

```markup
<script src="index.js"></script>
```

In [next step](https://github.com/pip-webui/pip-webui-sample/blob/master/step2/Readme.md) we will describe how to include pip-webui components to your application