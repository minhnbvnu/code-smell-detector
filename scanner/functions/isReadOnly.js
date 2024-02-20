function isReadOnly(cm) {
    return cm.options.readOnly || cm.doc.cantEdit;
  }