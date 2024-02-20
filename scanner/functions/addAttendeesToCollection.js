function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach(function(attendee) {
        collection.add(attendee);
      });
    }