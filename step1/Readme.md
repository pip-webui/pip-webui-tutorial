# Pip.WebUI Getting Started <br/> Step 1. Create application structure

Create `package.json` file in root of project with such code:

```javascript
{
  "name": "<your_application_name>",
  "version": "<your_application_version>",
  "author": "<your_application_author>",
  "description": "<your_application_description>",
  "contributors": [
    {
      "name": "<contributor_name>",
      "email": "<contributor_email>"
    }
  ],
  "keywords": [
    "<application_keyword>",
    "<application_keyword_2>"
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
    "pip-webui": "git+https://github.com/pip-webui/pip-webui.git",
    "pip-webui-tasks": "git+https://github.com/pip-webui/pip-webui-tasks.git"
  }
}

```

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