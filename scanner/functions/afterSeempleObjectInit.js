function afterSeempleObjectInit(def) {
  // Seemple initializer
  afterSeempleInit.call(this);
  // create a set of data keys
  def.keys = {};

  // trigger asterisk events
  addListener(this, '_change:delegated', changeDelegatedHandler);

  // trigger asterisk events removal
  addListener(this, '_delete:delegated', deleteDelegatedHandler);

  // fire "modify" and "set" events when data key is changed
  addListener(this, 'change', changeHandler);

  // fire "modify" and "remove" events when data key is removed
  addListener(this, 'delete', deleteHandler);
}