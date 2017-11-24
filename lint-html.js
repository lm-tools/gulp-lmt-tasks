const gutil = require('gulp-util');
const htmlLinkCrawler = require('html-link-crawler');
const LintTargetBlank = require('lint-target-blank');

/**
 * Crawls site for all internal links. Visits those links and checks for vulnerabilities:
 *   - where target="_blank" is used without rel="noreferrer nofollow"
 * @param taskName
 * @param ignoreQsParams
 */
module.exports = ({server, ignoreQsParams=[]}) => new Promise((accept, reject) => {
  process.env = process.env || 'TEST';
  server
    .on('listening', addr => {
      const host = addr.address === '::' ? 'localhost' : addr.address;
      const lintTargetBlank = new LintTargetBlank({});
      htmlLinkCrawler({ url: `http://${host}:${addr.port}/`, ignoreQsParams })
        .on('htmlFetchComplete', htmlMap => {
          const errorStr = Object.keys(htmlMap)
            .map(url => ({ url, errors: lintTargetBlank.lint(htmlMap[url]) }))
            .filter(({ errors }) => errors.length > 0)
            .map(({ url, errors }) => `  ${url}\n    ${errors.map(e => e.element)
              .join('\n    ')}`)
            .join('\n');
          if (errorStr) {
            gutil.log(gutil.colors.red(
              `The following elements require rel="noreferrer nofollow"\n\n${errorStr}`
            ));
            process.exit(1);
            reject();
          } else {
            process.exit(0);
            accept();
          }
        })
        .start();
    });
});
