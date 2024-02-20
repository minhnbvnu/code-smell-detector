async function _parseIcon({ icon }) {
    // for safe
    icon = Vue.prototype.$meta.util.escapeURL(icon);
    // support backend api static
    if (icon.indexOf('/api/static/') === 0) {
      return Vue.prototype.$meta.util.combineFetchStaticPath(icon);
    }
    // split module:group:name
    const parts = icon.split(':');
    if (parts.length < 3) {
      // just use as icon-f7
      return icon;
    }
    const moduleName = parts[0] || 'a-iconbooster';
    const group = parts[1] || 'default';
    const name = parts[2] || '';
    // load module
    const module = await Vue.prototype.$meta.module.use(moduleName);
    // group
    const groupHref = module.options.icons[group];
    // combine
    return `${groupHref}#${name}`;
  }