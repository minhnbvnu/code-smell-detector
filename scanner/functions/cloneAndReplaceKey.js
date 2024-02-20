function cloneAndReplaceKey(oldElement, newKey) {
              var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
              return newElement;
            }