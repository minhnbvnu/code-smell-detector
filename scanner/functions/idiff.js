function idiff(dom, vnode, context, mountAll, componentRoot) {
  var out = dom,
      prevSvgMode = isSvgMode; // empty values (null, undefined, booleans) render as empty Text nodes

  if (vnode == null || typeof vnode === 'boolean') vnode = ''; // Fast case: Strings & Numbers create/update Text nodes.

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    // update if it's already a Text node:
    if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
      /* istanbul ignore if */

      /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
      if (dom.nodeValue != vnode) {
        dom.nodeValue = vnode;
      }
    } else {
      // it wasn't a Text node: replace it with one and recycle the old Element
      out = document.createTextNode(vnode);

      if (dom) {
        if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
        recollectNodeTree(dom, true);
      }
    }

    out['__preactattr_'] = true;
    return out;
  } // If the VNode represents a Component, perform a component diff:


  var vnodeName = vnode.nodeName;

  if (typeof vnodeName === 'function') {
    return buildComponentFromVNode(dom, vnode, context, mountAll);
  } // Tracks entering and exiting SVG namespace when descending through the tree.


  isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode; // If there's no existing element or it's the wrong type, create a new one:

  vnodeName = String(vnodeName);

  if (!dom || !isNamedNode(dom, vnodeName)) {
    out = createNode(vnodeName, isSvgMode);

    if (dom) {
      // move children into the replacement node
      while (dom.firstChild) {
        out.appendChild(dom.firstChild);
      } // if the previous Element was mounted into the DOM, replace it inline


      if (dom.parentNode) dom.parentNode.replaceChild(out, dom); // recycle the old element (skips non-Element node types)

      recollectNodeTree(dom, true);
    }
  }

  var fc = out.firstChild,
      props = out['__preactattr_'],
      vchildren = vnode.children;

  if (props == null) {
    props = out['__preactattr_'] = {};

    for (var a = out.attributes, i = a.length; i--;) {
      props[a[i].name] = a[i].value;
    }
  } // Optimization: fast-path for elements containing a single TextNode:


  if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
    if (fc.nodeValue != vchildren[0]) {
      fc.nodeValue = vchildren[0];
    }
  } // otherwise, if there are existing or new children, diff them:
  else if (vchildren && vchildren.length || fc != null) {
      innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
    } // Apply attributes/props from VNode to the DOM Element:


  diffAttributes(out, vnode.attributes, props); // restore previous SVG mode: (in case we're exiting an SVG namespace)

  isSvgMode = prevSvgMode;
  return out;
}