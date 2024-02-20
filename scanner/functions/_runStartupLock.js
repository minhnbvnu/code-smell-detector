async function _runStartupLock({ ctx, startup, instanceStartup }) {
    // ignore debounce for test
    const force = instanceStartup && instanceStartup.options && instanceStartup.options.force;
    if (!force && !ctx.app.meta.isTest) {
      const fullKey = `${startup.module}:${startup.name}`;
      const cacheKey = `startupDebounce:${fullKey}${instanceStartup ? `:${ctx.instance.id}` : ''}`;
      const debounce =
        typeof startup.config.debounce === 'number' ? startup.config.debounce : ctx.app.config.queue.startup.debounce;
      const cache = ctx.cache.db.module('a-base');
      const flag = await cache.getset(cacheKey, true, debounce);
      if (flag) return;
    }
    // perform
    await _runStartupInner({ startup, instanceStartup });
  }