function ngTranscludeCloneAttachFn(clone) {
      if (clone.length) {
        $element.empty();
        $element.append(clone);
      }
    }