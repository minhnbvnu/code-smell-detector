function ContainerEditor(containerId) {
  if (!_.isString(containerId)) throw new Error("Illegal argument: Expecting container id.");
  FormEditor.call(this);
  this.containerId = containerId;
}