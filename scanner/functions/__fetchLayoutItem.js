async function __fetchLayoutItem({ Vue, layoutKey }) {
  try {
    const layoutItem = await Vue.prototype.$meta.api.post('/a/base/resource/read', {
      atomStaticKey: layoutKey,
      options: {
        locale: false,
      },
    });
    return layoutItem;
  } catch (err) {
    if (err.code === 401 || err.code === 403) {
      return null;
    }
    throw err;
  }
}