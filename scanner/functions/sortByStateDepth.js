function sortByStateDepth(a,b) {
        return a.name.split(".").length - b.name.split(".").length;
      }