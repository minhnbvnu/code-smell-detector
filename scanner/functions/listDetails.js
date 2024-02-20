function listDetails(obj) {
        return [
          obj.recurrenceId.toUnixTime(),
          obj.recurrenceId.toString()
        ];
      }