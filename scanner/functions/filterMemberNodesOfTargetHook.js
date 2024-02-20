function filterMemberNodesOfTargetHook(targetHookNode, hookNode) {
  const targetHookName = targetHookNode.node.id.name;
  return targetHookName != null && (targetHookName === (hookNode.node.init.object && hookNode.node.init.object.name) || targetHookName === hookNode.node.init.name);
}