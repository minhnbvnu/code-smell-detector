async function _runStartupInner({ startup, instanceStartup }) {
    // context
    const context = {
      options: instanceStartup ? instanceStartup.options : undefined,
    };
    // bean
    const bean = startup.bean;
    // execute
    return await loader.app.meta.util.executeBean({
      subdomain: instanceStartup ? instanceStartup.subdomain : undefined,
      context,
      beanModule: bean.module,
      beanFullName: `${bean.module}.startup.${bean.name}`,
      transaction: startup.config.transaction,
    });
  }