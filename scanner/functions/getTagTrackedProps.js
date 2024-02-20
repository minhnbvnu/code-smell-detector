function getTagTrackedProps(tag, ownTag, level = 0) {
  const props = [];
  // do not include tracked properties from dependencies
  if (!tag || level > 1) {
    return props;
  }
  const subtags = tag.subtags || (Array.isArray(tag.subtag) ? tag.subtag : []);
  if (tag.subtag && !Array.isArray(tag.subtag)) {
    if (tag.subtag._propertyKey) props.push(tag.subtag);

    props.push(...getTagTrackedProps(tag.subtag, ownTag, level + 1));
  }
  if (subtags) {
    subtags.forEach((t) => {
      if (t === ownTag) return;
      if (t._propertyKey) props.push(t);
      props.push(...getTagTrackedProps(t, ownTag, level + 1));
    });
  }
  return props;
}