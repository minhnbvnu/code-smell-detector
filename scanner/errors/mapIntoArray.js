function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
              var type = typeof children;
              if (type === "undefined" || type === "boolean") {
                children = null;
              }
              var invokeCallback = false;
              if (children === null) {
                invokeCallback = true;
              } else {
                switch (type) {
                  case "string":
                  case "number":
                    invokeCallback = true;
                    break;
                  case "object":
                    switch (children.$$typeof) {
                      case REACT_ELEMENT_TYPE:
                      case REACT_PORTAL_TYPE:
                        invokeCallback = true;
                    }
                }
              }
              if (invokeCallback) {
                var _child = children;
                var mappedChild = callback(_child);
                var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
                if (isArray(mappedChild)) {
                  var escapedChildKey = "";
                  if (childKey != null) {
                    escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                  }
                  mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                    return c;
                  });
                } else if (mappedChild != null) {
                  if (isValidElement(mappedChild)) {
                    {
                      if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                        checkKeyStringCoercion(mappedChild.key);
                      }
                    }
                    mappedChild = cloneAndReplaceKey(
                      mappedChild,
                      // Keep both the (mapped) and old keys if they differ, just as
                      // traverseAllChildren used to do for objects as children
                      escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                      (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                        // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                        // eslint-disable-next-line react-internal/safe-string-coercion
                        escapeUserProvidedKey("" + mappedChild.key) + "/"
                      ) : "") + childKey
                    );
                  }
                  array.push(mappedChild);
                }
                return 1;
              }
              var child;
              var nextName;
              var subtreeCount = 0;
              var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
              if (isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                  child = children[i];
                  nextName = nextNamePrefix + getElementKey(child, i);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else {
                var iteratorFn = getIteratorFn(children);
                if (typeof iteratorFn === "function") {
                  var iterableChildren = children;
                  {
                    if (iteratorFn === iterableChildren.entries) {
                      if (!didWarnAboutMaps) {
                        warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                      }
                      didWarnAboutMaps = true;
                    }
                  }
                  var iterator = iteratorFn.call(iterableChildren);
                  var step;
                  var ii = 0;
                  while (!(step = iterator.next()).done) {
                    child = step.value;
                    nextName = nextNamePrefix + getElementKey(child, ii++);
                    subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                  }
                } else if (type === "object") {
                  var childrenString = String(children);
                  throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                }
              }
              return subtreeCount;
            }