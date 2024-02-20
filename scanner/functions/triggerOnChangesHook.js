function triggerOnChangesHook() {
        destination.$onChanges(changes);
        // Now clear the changes so that we schedule onChanges when more changes arrive
        changes = undefined;
      }