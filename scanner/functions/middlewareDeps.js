function middlewareDeps(ctx, options) {
  let deps = options.dependencies || [];
  if (typeof deps === 'string') deps = deps.split(',');
  return deps.every(key => ctx[MWSTATUS][key] !== false);
}