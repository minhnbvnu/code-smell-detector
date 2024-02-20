function build_recursive_monsters(nt, t, n){
    var monsters = [t];
    for (var i = 1; i <= n; ++i)
      monsters[i] = nt.join(monsters[i - 1]);
    return monsters;
  }