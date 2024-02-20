function updateSortProperties(propertyName) {
        setupSortProperties.call(this);
        changeMeta.property.recomputeOnce.call(this, propertyName);
      }