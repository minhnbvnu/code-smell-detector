function onEditorActivity(cm, f) {
    cm.on("cursorActivity", f)
    cm.on("blur", f)
    cm.on("scroll", f)
    cm.on("setDoc", f)
    return function() {
      cm.off("cursorActivity", f)
      cm.off("blur", f)
      cm.off("scroll", f)
      cm.off("setDoc", f)
    }
  }