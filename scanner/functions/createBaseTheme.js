function createBaseTheme({ toc, link, attrs } = {}) {
  const mdIt = markdownIt();

  mdIt
    .use(markdownItLink, {
      externalAttrs: {
        target: '_blank',
      },
      ...link,
    })
    .use(markdownItPreWrapper, {
      getWrapperClass(lang) {
        return `v-md-pre-wrapper v-md-pre-wrapper-${lang}`;
      },
    })
    .use(markdownItAttr, {
      leftDelimiter: '{{{',
      rightDelimiter: '}}}',
      ...attrs,
      allowedAttributes: ['width', 'height', ...attrs?.allowedAttributes],
    })
    .use(markdownItHeadingTag, {
      getMarks(title, level, unique) {
        return [
          {
            attr: HEADING_MARKUP,
            value: `${slugify(title)}${unique ? `-${unique}` : ''}`,
          },
        ];
      },
    })
    .use(markdownItTableOfContent, {
      listClass: 'v-md-toc',
      listItemClass: 'v-md-toc-item',
      getAnchorAttrs(title, level, unique) {
        return [
          {
            attr: ANCHOR_MARKUP,
            value: `${slugify(title)}${unique ? `-${unique}` : ''}`,
          },
        ];
      },
      ...toc,
    })
    .use(markdownItLineNumber, {
      lineMarkup: LINE_MARKUP,
    });

  return {
    previewClass: 'markdown-body',
    extend(callback) {
      callback(mdIt);
    },
    markdownParser: mdIt,
  };
}