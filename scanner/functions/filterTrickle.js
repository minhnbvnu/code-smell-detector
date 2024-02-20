function filterTrickle(sdp) {
      return sdp.replace(/a=ice-options:trickle\s\n/g, "");
    }