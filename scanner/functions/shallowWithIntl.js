function shallowWithIntl(node) {
  return shallow(nodeWithIntlProp(node), { context: intl });
}