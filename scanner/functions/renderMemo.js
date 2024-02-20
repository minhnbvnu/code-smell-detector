function renderMemo(request, task, type, props, ref) {
              var innerType = type.type;
              var resolvedProps = resolveDefaultProps(innerType, props);
              renderElement(request, task, innerType, resolvedProps, ref);
            }