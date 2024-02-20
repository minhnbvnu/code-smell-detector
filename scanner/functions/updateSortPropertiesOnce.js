function updateSortPropertiesOnce() {
        Ember.run.once(this, updateSortProperties, changeMeta.propertyName);
      }