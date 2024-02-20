function emojify(text) {
  return text
    .replace(/<(pre|template|code)[^>]*?>[\s\S]+?<\/(pre|template|code)>/g, m => m.replace(/:/g, '__colon__'))
    .replace(/:(\w+?):/ig, (inBrowser && window.emojify) || replace)
    .replace(/__colon__/g, ':')
}