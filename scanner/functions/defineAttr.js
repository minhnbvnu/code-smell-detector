function defineAttr(attr) {
    Object.defineProperty(Time.prototype, attr, {
      get: function getTimeAttr() {
        if (this._pendingNormalization) {
          this._normalize();
          this._pendingNormalization = false;
        }

        return this._time[attr];
      },
      set: function setTimeAttr(val) {
        // Check if isDate will be set and if was not set to normalize date.
        // This avoids losing days when seconds, minutes and hours are zeroed
        // what normalize will do when time is a date.
        if (attr === "isDate" && val && !this._time.isDate) {
          this.adjust(0, 0, 0, 0);
        }
        this._cachedUnixTime = null;
        this._pendingNormalization = true;
        this._time[attr] = val;
      }
    });

  }