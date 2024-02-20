function findMenuItem([itemLabel, ...restLabels], tpl) {
  if (R.isNil(tpl)) {
    return null;
  }

  const item = R.find(R.propEq('label', itemLabel), tpl);
  if (R.isNil(item)) {
    return null;
  } else if (R.isEmpty(restLabels)) {
    return item;
  }

  return findMenuItem(restLabels, item.submenu);
}