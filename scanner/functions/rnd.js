function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }