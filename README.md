# Gulp lmt tasks

Contains common tasks used by lmt projects.  

## Usage

### lintHtml

```ecmascript 6
    gulp.task('lint-all-html', () => {
        const port = 3001;
        const serverStartPromise = new Promise(accept =>
            http.createServer(require('./app/app'))
              .listen(port, () => accept())
        );
        return serverStartPromise.then(() => lintHtml({
            url: `http://localhost:${port}`,
            ignoreQsParams: ['fromSearch'],
        }))
        .then(() => process.exit(0))
        .catch(e => gutil.log(gutil.colors.red(e)) && process.exit(1));
    });
```

## Development

These are currently tested in project. To use a local version for the purposes of dev,
use npm link:

```bash
    $ npm link
    $ cd PROJECT_DIR
    $ npm link gulp-lmt-tasks
```
