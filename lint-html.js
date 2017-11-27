const htmlLinkCrawler = require('html-link-crawler');
const LintTargetBlank = require('lint-target-blank');

/**
 * Crawls site for all internal links. Visits those links and checks for vulnerabilities:
 *   - where target="_blank" is used without rel="noreferrer nofollow"
 * @param taskName
 * @param ignoreQsParams
 */
module.exports = ({url, ignoreQsParams=[]}) => new Promise((accept, reject) => {
  const lintTargetBlank = new LintTargetBlank({});
  htmlLinkCrawler({ url, ignoreQsParams })
    .on('htmlFetchComplete', htmlMap => {
      const errorStr = Object.keys(htmlMap)
        .map(url => ({ url, errors: lintTargetBlank.lint(htmlMap[url]) }))
        .filter(({ errors }) => errors.length > 0)
        .map(({ url, errors }) => `  ${url}\n    ${errors.map(e => e.element)
          .join('\n    ')}`)
        .join('\n');
      if (errorStr) {
        reject(`The following elements require rel="noreferrer nofollow"\n\n${errorStr}`);
      } else {
        accept();
      }
    })
    .start();
});
