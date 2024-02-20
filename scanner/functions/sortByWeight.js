function sortByWeight(array) {
      array.sort(function(a, b) {
        return b.weight - a.weight
      })
    }