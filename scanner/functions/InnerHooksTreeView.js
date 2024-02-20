function InnerHooksTreeView({
  element,
  hookNames,
  hooks,
  id,
  inspectedElement,
  path
}) {
  return hooks.map((hook, index) => /*#__PURE__*/react["createElement"](HookView, {
    key: index,
    element: element,
    hook: hooks[index],
    hookNames: hookNames,
    id: id,
    inspectedElement: inspectedElement,
    path: path.concat([index])
  }));
}