function build_recursive_monsters_2(mf1, mf2, nt, t, n){
    var monsters = [t];
    for (var i = 1; i <= n; ++i)
      monsters[i] = nt[0] + mf1[i - 1] + nt[1] + mf2[i - 1] + nt[2] + monsters[i - 1] + nt[3];
    return monsters;
  }