async function __fetchAppItem({ Vue, appKey }) {
  try {
    const appItem = await Vue.prototype.$meta.api.post('/a/app/resource/read', {
      atomStaticKey: appKey,
      options: {
        //  locale: false, // should return locale info
      },
    });
    return appItem;
  } catch (err) {
    if (err.code === 401 || err.code === 403) {
      return null;
    }
    throw err;
  }
}