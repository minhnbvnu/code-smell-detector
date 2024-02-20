function flattenTopLevelChildren(children) {
            if (!React2.isValidElement(children)) {
              return toArray(children);
            }
            var element = children;
            if (element.type !== REACT_FRAGMENT_TYPE) {
              return [element];
            }
            var fragmentChildren = element.props.children;
            if (!React2.isValidElement(fragmentChildren)) {
              return toArray(fragmentChildren);
            }
            var fragmentChildElement = fragmentChildren;
            return [fragmentChildElement];
          }