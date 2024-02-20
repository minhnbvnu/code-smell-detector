function breakNode(tx, args) {
  if (!args.selection) {
    throw new Error("Argument 'selection' is mandatory.");
  }
  if (!args.containerId) {
    throw new Error("Argument 'containerId' is mandatory.");
  }
  if (!args.selection.isCollapsed()) {
    var out = deleteSelection(tx, args);
    args.selection = out.selection;
  }
  var range = args.selection.getRange();
  var node = tx.get(range.start.path[0]);
  // TODO: we want to allow custom break behaviors
  // for that to happen we need to learn more
  if (node.isInstanceOf('text')) {
    return breakTextNode(tx, args);
  } else {
    console.info("Breaking is not supported for node type %s.", node.type);
    return args;
  }
}