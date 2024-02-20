function getPositions(list, reference) {
        var hash = reference.hashCode,
            c, last = list.length, child,
            result = [];
        for(c=0; c<last; c++) {
          child = list[c];
          if(child.hashCode === hash) {
            result.push(c);
          }
        }
        return result;
      }