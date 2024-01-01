function isAttachedToScene (object) {
      if (object.parent) {
        return isAttachedToScene(object.parent);
      } else {
        return (object === scene);
      }
    }