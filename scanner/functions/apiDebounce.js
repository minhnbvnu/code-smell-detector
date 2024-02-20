function apiDebounce({ Vue }) {
  // invokes
  const invokes = __invokes;
  __invokes = [];
  // actions
  const actions = invokes.map(item => {
    let url = item.args[0];
    const baseURL = Vue.prototype.$meta.util.getBaseURL();
    if (url.indexOf(baseURL) === 0) {
      url = url.substr(baseURL.length);
    }
    url = url.substr('/api'.length);
    const params = {
      method: item.key,
      url,
    };
    if (item.key === 'post') {
      params.body = item.args[1];
    }
    return params;
  });
  Vue.prototype.$meta.api
    .post('/a/base/util/performActions', { actions })
    .then(data => {
      for (let i = 0; i < invokes.length; i++) {
        const item = data[i];
        let err;
        if (item.err) {
          err = new Error();
          err.code = item.err.code;
          err.message = item.err.message;
        }
        invokes[i].callback(err, item.res);
      }
    })
    .catch(err => {
      // all err
      for (const item of invokes) {
        item.callback(err);
      }
    });
}