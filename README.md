# Gulp lmt tasks

Contains common tasks used by lmt projects.  

## Usage

### lintHtml

```ecmascript 6
const { lintHtml } = require('gulp-lmt-tasks');
lintHtml('lint-html', ['fromSearch']);
```

## Development

These are currently tested in project. To use a local version for the purposes of dev,
use npm link:

```bash
    $ npm link
    $ cd PROJECT_DIR
    $ npm link gulp-lmt-tasks
```
