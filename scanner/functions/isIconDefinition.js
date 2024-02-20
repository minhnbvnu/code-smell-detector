function isIconDefinition(target) {
  return typeof_default()(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof_default()(target.icon) === 'object' || typeof target.icon === 'function');
}