function getScopeInformation(fnPath) {
  const thisPaths = [];
  const argumentsPaths = [];
  const newTargetPaths = [];
  const superProps = [];
  const superCalls = [];
  fnPath.traverse({
    ClassProperty(child) {
      child.skip();
    },

    Function(child) {
      if (child.isArrowFunctionExpression()) return;
      child.skip();
    },

    ThisExpression(child) {
      thisPaths.push(child);
    },

    JSXIdentifier(child) {
      if (child.node.name !== "this") return;

      if (!child.parentPath.isJSXMemberExpression({
        object: child.node
      }) && !child.parentPath.isJSXOpeningElement({
        name: child.node
      })) {
        return;
      }

      thisPaths.push(child);
    },

    CallExpression(child) {
      if (child.get("callee").isSuper()) superCalls.push(child);
    },

    MemberExpression(child) {
      if (child.get("object").isSuper()) superProps.push(child);
    },

    ReferencedIdentifier(child) {
      if (child.node.name !== "arguments") return;
      argumentsPaths.push(child);
    },

    MetaProperty(child) {
      if (!child.get("meta").isIdentifier({
        name: "new"
      })) return;
      if (!child.get("property").isIdentifier({
        name: "target"
      })) return;
      newTargetPaths.push(child);
    }

  });
  return {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  };
}