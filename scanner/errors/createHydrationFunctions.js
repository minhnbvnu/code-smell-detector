    const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
      const isFragmentStart = isComment(node) && node.data === "[";
      const onMismatch = () => handleMismatch(
        node,
        vnode,
        parentComponent,
        parentSuspense,
        slotScopeIds,
        isFragmentStart
      );
      const { type, ref, shapeFlag, patchFlag } = vnode;
      let domType = node.nodeType;
      vnode.el = node;
      if (patchFlag === -2) {
        optimized = false;
        vnode.dynamicChildren = null;
      }
      let nextNode = null;
      switch (type) {
        case Text:
          if (domType !== 3 /* TEXT */) {
            if (vnode.children === "") {
              insert(vnode.el = createText(""), parentNode(node), node);
              nextNode = node;
            } else {
              nextNode = onMismatch();
            }
          } else {
            if (node.data !== vnode.children) {
              hasMismatch = true;
              warn(
                `Hydration text mismatch:
- Client: ${JSON.stringify(node.data)}
- Server: ${JSON.stringify(vnode.children)}`
              );
              node.data = vnode.children;
            }
            nextNode = nextSibling(node);
          }
          break;
        case Comment:
          if (domType !== 8 /* COMMENT */ || isFragmentStart) {
            nextNode = onMismatch();
          } else {
            nextNode = nextSibling(node);
          }
          break;
        case Static:
          if (isFragmentStart) {
            node = nextSibling(node);
            domType = node.nodeType;
          }
          if (domType === 1 /* ELEMENT */ || domType === 3 /* TEXT */) {
            nextNode = node;
            const needToAdoptContent = !vnode.children.length;
            for (let i = 0; i < vnode.staticCount; i++) {
              if (needToAdoptContent)
                vnode.children += nextNode.nodeType === 1 /* ELEMENT */ ? nextNode.outerHTML : nextNode.data;
              if (i === vnode.staticCount - 1) {
                vnode.anchor = nextNode;
              }
              nextNode = nextSibling(nextNode);
            }
            return isFragmentStart ? nextSibling(nextNode) : nextNode;
          } else {
            onMismatch();
          }
          break;
        case Fragment:
          if (!isFragmentStart) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateFragment(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
          break;
        default:
          if (shapeFlag & 1) {
            if (domType !== 1 /* ELEMENT */ || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
              nextNode = onMismatch();
            } else {
              nextNode = hydrateElement(
                node,
                vnode,
                parentComponent,
                parentSuspense,
                slotScopeIds,
                optimized
              );
            }
          } else if (shapeFlag & 6) {
            vnode.slotScopeIds = slotScopeIds;
            const container = parentNode(node);
            mountComponent(
              vnode,
              container,
              null,
              parentComponent,
              parentSuspense,
              isSVGContainer(container),
              optimized
            );
            nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
            if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
              nextNode = nextSibling(nextNode);
            }
            if (isAsyncWrapper(vnode)) {
              let subTree;
              if (isFragmentStart) {
                subTree = createVNode(Fragment);
                subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
              } else {
                subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
              }
              subTree.el = node;
              vnode.component.subTree = subTree;
            }
          } else if (shapeFlag & 64) {
            if (domType !== 8 /* COMMENT */) {
              nextNode = onMismatch();
            } else {
              nextNode = vnode.type.hydrate(
                node,
                vnode,
                parentComponent,
                parentSuspense,
                slotScopeIds,
                optimized,
                rendererInternals,
                hydrateChildren
              );
            }
          } else if (shapeFlag & 128) {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              isSVGContainer(parentNode(node)),
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateNode
            );
          } else {
            warn("Invalid HostVNode type:", type, `(${typeof type})`);
          }
      }
      if (ref != null) {
        setRef(ref, null, parentSuspense, vnode);
      }
      return nextNode;
    };
    const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
      optimized = optimized || !!vnode.dynamicChildren;
      const { type, props, patchFlag, shapeFlag, dirs } = vnode;
      const forcePatchValue = type === "input" && dirs || type === "option";
      {
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        if (props) {
          if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
            for (const key in props) {
              if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
                patchProp(
                  el,
                  key,
                  null,
                  props[key],
                  false,
                  void 0,
                  parentComponent
                );
              }
            }
          } else if (props.onClick) {
            patchProp(
              el,
              "onClick",
              null,
              props.onClick,
              false,
              void 0,
              parentComponent
            );
          }
        }
        let vnodeHooks;
        if (vnodeHooks = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHooks, parentComponent, vnode);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
          queueEffectWithSuspense(() => {
            vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
        if (shapeFlag & 16 && // skip if element has innerHTML / textContent
        !(props && (props.innerHTML || props.textContent))) {
          let next = hydrateChildren(
            el.firstChild,
            vnode,
            el,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
          let hasWarned = false;
          while (next) {
            hasMismatch = true;
            if (!hasWarned) {
              warn(
                `Hydration children mismatch in <${vnode.type}>: server rendered element contains more child nodes than client vdom.`
              );
              hasWarned = true;
            }
            const cur = next;
            next = next.nextSibling;
            remove(cur);
          }
        } else if (shapeFlag & 8) {
          if (el.textContent !== vnode.children) {
            hasMismatch = true;
            warn(
              `Hydration text content mismatch in <${vnode.type}>:
- Client: ${el.textContent}
- Server: ${vnode.children}`
            );
            el.textContent = vnode.children;
          }
        }
      }
      return el.nextSibling;
    };
    const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {