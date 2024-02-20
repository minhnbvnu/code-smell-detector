function addSources(styles, sourceBucket) {
  return styles.map((style) => {
    if (style.source) return style;
    return xtend(style, {
      id: `${style.id}.${sourceBucket}`,
      source: (sourceBucket === 'hot') ? Constants.sources.HOT : Constants.sources.COLD
    });
  });
}