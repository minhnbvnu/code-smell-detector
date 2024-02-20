function createHighlightRender({
  codeHighlightExtensionMap = {},
  hasLang = () => true,
  highlight = (str) => str,
  codeBlockClass,
}) {
  const getCodeBlockClass = (lang) => (codeBlockClass ? codeBlockClass(lang) : `language-${lang}`);

  return function (str, lang) {
    let res = escapeHtml(str);

    lang = codeHighlightExtensionMap[lang] || lang;

    if (lang) {
      if (hasLang(lang)) {
        res = highlight(str, lang);
      }
    }

    return `<pre class="${getCodeBlockClass(lang)}"><code>${res}</code></pre>`;
  };
}