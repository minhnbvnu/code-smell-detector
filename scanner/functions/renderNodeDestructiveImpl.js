function renderNodeDestructiveImpl(request, task, node) {
              task.node = node;
              if (typeof node === "object" && node !== null) {
                switch (node.$$typeof) {
                  case REACT_ELEMENT_TYPE: {
                    var element = node;
                    var type = element.type;
                    var props = element.props;
                    var ref = element.ref;
                    renderElement(request, task, type, props, ref);
                    return;
                  }
                  case REACT_PORTAL_TYPE:
                    throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                  case REACT_LAZY_TYPE: {
                    var lazyNode = node;
                    var payload = lazyNode._payload;
                    var init = lazyNode._init;
                    var resolvedNode;
                    {
                      try {
                        resolvedNode = init(payload);
                      } catch (x) {
                        if (typeof x === "object" && x !== null && typeof x.then === "function") {
                          pushBuiltInComponentStackInDEV(task, "Lazy");
                        }
                        throw x;
                      }
                    }
                    renderNodeDestructive(request, task, resolvedNode);
                    return;
                  }
                }
                if (isArray(node)) {
                  renderChildrenArray(request, task, node);
                  return;
                }
                var iteratorFn = getIteratorFn(node);
                if (iteratorFn) {
                  {
                    validateIterable(node, iteratorFn);
                  }
                  var iterator = iteratorFn.call(node);
                  if (iterator) {
                    var step = iterator.next();
                    if (!step.done) {
                      var children = [];
                      do {
                        children.push(step.value);
                        step = iterator.next();
                      } while (!step.done);
                      renderChildrenArray(request, task, children);
                      return;
                    }
                    return;
                  }
                }
                var childString = Object.prototype.toString.call(node);
                throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
              }
              if (typeof node === "string") {
                var segment = task.blockedSegment;
                segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
                return;
              }
              if (typeof node === "number") {
                var _segment = task.blockedSegment;
                _segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
                return;
              }
              {
                if (typeof node === "function") {
                  error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
                }
              }
            }