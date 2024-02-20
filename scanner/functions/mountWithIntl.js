function mountWithIntl(node) {
  return mount(nodeWithIntlProp(node), {
    context: intl,
    childContextTypes: { intl: intlShape }
  });
}