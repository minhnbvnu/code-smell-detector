function ie8EventNormalizer(event) {
        return event.which ? event.which : event.keyCode;
      }