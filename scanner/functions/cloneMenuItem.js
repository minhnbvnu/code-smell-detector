function cloneMenuItem(item) {
  item = _.pick(
    item,
    'type',
    'label',
    'id',
    'enabled',
    'visible',
    'command',
    'submenu',
    'commandDetail',
    'role',
    'accelerator',
    'before',
    'after',
    'beforeGroupContaining',
    'afterGroupContaining'
  );
  if (item.id === null || item.id === undefined) {
    item.id = normalizeLabel(item.label);
  }
  if (item.submenu != null) {
    item.submenu = item.submenu.map(submenuItem => cloneMenuItem(submenuItem));
  }
  return item;
}