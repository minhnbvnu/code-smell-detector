function mergeXVIZStyles(style1, style2) {
  if (!style1) {
    return style2 || {};
  }
  if (!style2) {
    return style1;
  }

  const mergedStyles = {...style1};

  for (const streamName in style2) {
    if (mergedStyles[streamName]) {
      const rules1 = style1[streamName];
      const rules2 = style2[streamName];
      mergedStyles[streamName] = rules1.concat(rules2);
    } else {
      mergedStyles[streamName] = style2[streamName];
    }
  }
  return mergedStyles;
}