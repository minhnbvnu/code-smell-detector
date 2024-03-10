function getConstantType(node, context) {
    const { constantCache } = context;
    switch (node.type) {
      case 1:
        if (node.tagType !== 0) {
          return 0;
        }
        const cached = constantCache.get(node);
        if (cached !== void 0) {
          return cached;
        }
        const codegenNode = node.codegenNode;
        if (codegenNode.type !== 13) {
          return 0;
        }
        if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject") {
          return 0;
        }
        const flag = getPatchFlag(codegenNode);
        if (!flag) {
          let returnType2 = 3;
          const generatedPropsType = getGeneratedPropsConstantType(node, context);
          if (generatedPropsType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (generatedPropsType < returnType2) {
            returnType2 = generatedPropsType;
          }
          for (let i = 0; i < node.children.length; i++) {
            const childType = getConstantType(node.children[i], context);
            if (childType === 0) {
              constantCache.set(node, 0);
              return 0;
            }
            if (childType < returnType2) {
              returnType2 = childType;
            }
          }
          if (returnType2 > 1) {
            for (let i = 0; i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7 && p.name === "bind" && p.exp) {
                const expType = getConstantType(p.exp, context);
                if (expType === 0) {
                  constantCache.set(node, 0);
                  return 0;
                }
                if (expType < returnType2) {
                  returnType2 = expType;
                }
              }
            }
          }
          if (codegenNode.isBlock) {
            for (let i = 0; i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7) {
                constantCache.set(node, 0);
                return 0;
              }
            }
            context.removeHelper(OPEN_BLOCK);
            context.removeHelper(
              getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
            );
            codegenNode.isBlock = false;
            context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
          }
          constantCache.set(node, returnType2);
          return returnType2;
        } else {
          constantCache.set(node, 0);
          return 0;
        }
      case 2:
      case 3:
        return 3;
      case 9:
      case 11:
      case 10:
        return 0;
      case 5:
      case 12:
        return getConstantType(node.content, context);
      case 4:
        return node.constType;
      case 8:
        let returnType = 3;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (isString(child) || isSymbol(child)) {
            continue;
          }
          const childType = getConstantType(child, context);
          if (childType === 0) {
            return 0;
          } else if (childType < returnType) {
            returnType = childType;
          }
        }
        return returnType;
      default:
        return 0;
    }
  }