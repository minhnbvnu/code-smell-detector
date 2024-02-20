function hoistFunctionEnvironment(fnPath, specCompliant = false, allowInsertArrow = true) {
  const thisEnvFn = fnPath.findParent(p => {
    return p.isFunction() && !p.isArrowFunctionExpression() || p.isProgram() || p.isClassProperty({
      static: false
    });
  });
  const inConstructor = (thisEnvFn == null ? void 0 : thisEnvFn.node.kind) === "constructor";

  if (thisEnvFn.isClassProperty()) {
    throw fnPath.buildCodeFrameError("Unable to transform arrow inside class property");
  }

  const {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  } = getScopeInformation(fnPath);

  if (inConstructor && superCalls.length > 0) {
    if (!allowInsertArrow) {
      throw superCalls[0].buildCodeFrameError("Unable to handle nested super() usage in arrow");
    }

    const allSuperCalls = [];
    thisEnvFn.traverse({
      Function(child) {
        if (child.isArrowFunctionExpression()) return;
        child.skip();
      },

      ClassProperty(child) {
        child.skip();
      },

      CallExpression(child) {
        if (!child.get("callee").isSuper()) return;
        allSuperCalls.push(child);
      }

    });
    const superBinding = getSuperBinding(thisEnvFn);
    allSuperCalls.forEach(superCall => {
      const callee = t.identifier(superBinding);
      callee.loc = superCall.node.callee.loc;
      superCall.get("callee").replaceWith(callee);
    });
  }

  if (argumentsPaths.length > 0) {
    const argumentsBinding = getBinding(thisEnvFn, "arguments", () => t.identifier("arguments"));
    argumentsPaths.forEach(argumentsChild => {
      const argsRef = t.identifier(argumentsBinding);
      argsRef.loc = argumentsChild.node.loc;
      argumentsChild.replaceWith(argsRef);
    });
  }

  if (newTargetPaths.length > 0) {
    const newTargetBinding = getBinding(thisEnvFn, "newtarget", () => t.metaProperty(t.identifier("new"), t.identifier("target")));
    newTargetPaths.forEach(targetChild => {
      const targetRef = t.identifier(newTargetBinding);
      targetRef.loc = targetChild.node.loc;
      targetChild.replaceWith(targetRef);
    });
  }

  if (superProps.length > 0) {
    if (!allowInsertArrow) {
      throw superProps[0].buildCodeFrameError("Unable to handle nested super.prop usage");
    }

    const flatSuperProps = superProps.reduce((acc, superProp) => acc.concat(standardizeSuperProperty(superProp)), []);
    flatSuperProps.forEach(superProp => {
      const key = superProp.node.computed ? "" : superProp.get("property").node.name;
      const isAssignment = superProp.parentPath.isAssignmentExpression({
        left: superProp.node
      });
      const isCall = superProp.parentPath.isCallExpression({
        callee: superProp.node
      });
      const superBinding = getSuperPropBinding(thisEnvFn, isAssignment, key);
      const args = [];

      if (superProp.node.computed) {
        args.push(superProp.get("property").node);
      }

      if (isAssignment) {
        const value = superProp.parentPath.node.right;
        args.push(value);
      }

      const call = t.callExpression(t.identifier(superBinding), args);

      if (isCall) {
        superProp.parentPath.unshiftContainer("arguments", t.thisExpression());
        superProp.replaceWith(t.memberExpression(call, t.identifier("call")));
        thisPaths.push(superProp.parentPath.get("arguments.0"));
      } else if (isAssignment) {
        superProp.parentPath.replaceWith(call);
      } else {
        superProp.replaceWith(call);
      }
    });
  }

  let thisBinding;

  if (thisPaths.length > 0 || specCompliant) {
    thisBinding = getThisBinding(thisEnvFn, inConstructor);

    if (!specCompliant || inConstructor && hasSuperClass(thisEnvFn)) {
      thisPaths.forEach(thisChild => {
        const thisRef = thisChild.isJSX() ? t.jsxIdentifier(thisBinding) : t.identifier(thisBinding);
        thisRef.loc = thisChild.node.loc;
        thisChild.replaceWith(thisRef);
      });
      if (specCompliant) thisBinding = null;
    }
  }

  return thisBinding;
}