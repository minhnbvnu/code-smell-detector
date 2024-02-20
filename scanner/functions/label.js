function label(d) {
      if (!d.dummy) {
        return labelFormat(d);
      } else {
        return "";
      }
    }