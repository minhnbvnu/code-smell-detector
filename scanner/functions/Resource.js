function Resource(value) {
          shallowClearAndCopy(value || {}, this);
        }