function getIndexFromEID(eid) {
    var found = -1;
    for (var i = 0; i < moments.length; i++) {
      if (parseInt(moments[i].Event.Id) == parseInt(eid)) {
        found = i;
        break;
      }
    }
    return found; // really should never be -1
  }