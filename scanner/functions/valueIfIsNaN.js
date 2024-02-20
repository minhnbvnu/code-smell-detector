function valueIfIsNaN() {
        if(typeof(settings.firstclickvalueifempty) === 'number') {
          return settings.firstclickvalueifempty;
        } else {
          return (settings.min + settings.max) / 2;
        }
      }