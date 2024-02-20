function findMethodHost(template) {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      let templateHost = template.__dataHost;
      return templateHost && templateHost._methodHost || templateHost;
    }