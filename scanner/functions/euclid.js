function euclid(node1, node2) {
      var n1 = node1.id().split("-");
      var n2 = node2.id().split("-");
      return Math.sqrt( Math.pow(n1[0] - n2[0], 2) + Math.pow(n1[1] - n2[1], 2));
    }