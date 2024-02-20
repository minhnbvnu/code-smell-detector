function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }