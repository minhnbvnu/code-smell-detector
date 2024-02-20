function renderStartingTag (node, context) {
  var markup;
  if (node.tag && node.tag === 'body') {
    markup = '<body';
  } else if (node.tag && node.tag === 'img') {
    markup = '<img';
  } else {
    // 渲染tagName
    markup = '<div';
  }

  markup += " tag=\"" + (node.tag) + "\"";
  var directives = context.directives;
  var modules = context.modules;

  // construct synthetic data for module processing
  // because modules like style also produce code by parent VNode data
  if (isUndef(node.data) && hasAncestorData(node)) {
    node.data = {};
  }
  if (isDef(node.data)) {
    // check directives
    var dirs = node.data.directives;
    if (dirs) {
      for (var i = 0; i < dirs.length; i++) {
        var name = dirs[i].name;
        var dirRenderer = directives[name];
        if (dirRenderer && name !== 'show') {
          // directives mutate the node's data
          // which then gets rendered by modules
          dirRenderer(node, dirs[i]);
        }
      }
    }

    // v-show directive needs to be merged from parent to child
    var vshowDirectiveInfo = getVShowDirectiveInfo(node);
    if (vshowDirectiveInfo) {
      directives.show(node, vshowDirectiveInfo);
    }

    // apply other modules
    for (var i$1 = 0; i$1 < modules.length; i$1++) {
      var res = modules[i$1](node);
      if (res) {
        markup += res;
      }
    }
  }

  // 渲染样式
  markup += getStyleString(node);
   
  // attach scoped CSS ID
  // let scopeId
  // const activeInstance = context.activeInstance
  // if (isDef(activeInstance) &&
  //   activeInstance !== node.context &&
  //   isDef(scopeId = activeInstance.$options._scopeId)
  // ) {
  //   markup += ` ${(scopeId: any)}`
  // }
  // while (isDef(node)) {
  //   if (isDef(scopeId = node.context.$options._scopeId)) {
  //     markup += ` ${scopeId}`
  //   }
  //   node = node.parent
  // }
  return markup + '>'
}