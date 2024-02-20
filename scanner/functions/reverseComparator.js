function reverseComparator(comp, descending) {
      return descending
          ? function(a, b) {return comp(b,a);}
          : comp;
    }