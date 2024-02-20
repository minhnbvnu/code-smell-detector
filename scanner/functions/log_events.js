function log_events(type, obj, evt) {
          obj.addEventListener(evt, log('capture ' + type + '.' + evt), true);
          obj.addEventListener(evt, log('bubble  ' + type + '.' + evt), false);
      }