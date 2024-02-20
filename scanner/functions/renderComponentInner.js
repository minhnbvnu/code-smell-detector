function renderComponentInner (node, isRoot, context) {
  var prevActive = context.activeInstance;
  // expose userContext on vnode
  node.ssrContext = context.userContext;
  var child = context.activeInstance = createComponentInstanceForVnode(
    node,
    context.activeInstance
  );
  normalizeRender(child);
  var childNode = child._render();
  childNode.parent = node;
    // component外部设置class，无法渲染到component内部
  var styleSheet = node.context.$data && node.context.$data.style;
  var style = {};
  if (node.data && node.data.staticClass) {
    if (styleSheet) {
      var classNames = node.data.staticClass.split(' '); 
      classNames.forEach(function (cls) {
        style = extend(style, styleSheet[cls]);
      });
    }
  }

  if (Object.keys(style).length > 0) {
    childNode.data.parentStaticStyle = style;
  }

  context.renderStates.push({
    type: 'Component',
    prevActive: prevActive
  });
  renderNode(childNode, isRoot, context);
}