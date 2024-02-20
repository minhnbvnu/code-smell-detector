function resolveComponentType(node, context, ssr = false) {
    let { tag } = node;
    const isExplicitDynamic = isComponentTag(tag);
    const isProp = findProp(node, "is");
    if (isProp) {
      if (isExplicitDynamic || false) {
        const exp = isProp.type === 6 ? isProp.value && createSimpleExpression(isProp.value.content, true) : isProp.exp;
        if (exp) {
          return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
            exp
          ]);
        }
      } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
        tag = isProp.value.content.slice(4);
      }
    }
    const isDir = !isExplicitDynamic && findDir(node, "is");
    if (isDir && isDir.exp) {
      {
        context.onWarn(
          createCompilerError(52, isDir.loc)
        );
      }
      return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
        isDir.exp
      ]);
    }
    const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
    if (builtIn) {
      if (!ssr)
        context.helper(builtIn);
      return builtIn;
    }
    context.helper(RESOLVE_COMPONENT);
    context.components.add(tag);
    return toValidAssetId(tag, `component`);
  }