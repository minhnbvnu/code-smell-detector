function formatOpts(opts) {
  opts = opts || {};
  // key
  opts.key = opts.key || 'koa.sess';

  // back-compat maxage
  if (!('maxAge' in opts)) opts.maxAge = opts.maxage;

  // defaults
  if (opts.overwrite == null) opts.overwrite = true;
  if (opts.httpOnly == null) opts.httpOnly = true;
  // delete null sameSite config
  if (opts.sameSite == null) delete opts.sameSite;
  if (opts.signed == null) opts.signed = true;
  if (opts.autoCommit == null) opts.autoCommit = true;

  debug('session options %j', opts);

  // setup encoding/decoding
  if (typeof opts.encode !== 'function') {
    opts.encode = util.encode;
  }
  if (typeof opts.decode !== 'function') {
    opts.decode = util.decode;
  }

  const store = opts.store;
  if (store) {
    assert(is.function(store.get), 'store.get must be function');
    assert(is.function(store.set), 'store.set must be function');
    assert(is.function(store.destroy), 'store.destroy must be function');
  }

  const externalKey = opts.externalKey;
  if (externalKey) {
    assert(is.function(externalKey.get), 'externalKey.get must be function');
    assert(is.function(externalKey.set), 'externalKey.set must be function');
  }

  const ContextStore = opts.ContextStore;
  if (ContextStore) {
    assert(is.class(ContextStore), 'ContextStore must be a class');
    assert(is.function(ContextStore.prototype.get), 'ContextStore.prototype.get must be function');
    assert(is.function(ContextStore.prototype.set), 'ContextStore.prototype.set must be function');
    assert(is.function(ContextStore.prototype.destroy), 'ContextStore.prototype.destroy must be function');
  }

  if (!opts.genid) {
    if (opts.prefix) opts.genid = () => `${opts.prefix}${uuid.v4()}`;
    else opts.genid = uuid.v4;
  }

  return opts;
}