function calc_overlap(a1, a2, b1, b2){
      var overlap = 0
      // if b1 is between [a1, a2]
      if(a1 <= b1 && b1 <= a2){
        // b is entirely inside of a
        if(b2 <= a2){
          overlap = b2 - b1
        }else {
          overlap = a2 - b1
        }
      }
      // if b2 is between [a1, a2]
      else if(a1 <= b2 && b2 <= a2){
        if(b1 <= a1){
          overlap = b2 - a1
        }else{
          overlap = b2 - b1
        }
      }
      // if b1 is left of a1 and b2 is right of a2
      else if(b1 <= a1 && a2 <= b2) {
        overlap = a2 - a1
      }
      return overlap
    }