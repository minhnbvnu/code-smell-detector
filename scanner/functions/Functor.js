function Functor(map) {
    if (!isInstanceOfU(Functor, this)) return freezeInDev(new Functor(map));
    this[MAP] = map;
  }