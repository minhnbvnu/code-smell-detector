function update_a_and_b(){
      // use P(A) or P(B) to drive P(A n B)
      var a1 = a.x, a2 = a.x + a.width
      var b1 = b.x, b2 = b.x + b.width
      scope.pOfAAndB = calc_overlap(a1, a2, b1, b2)
    }