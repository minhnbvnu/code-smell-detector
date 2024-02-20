function elems(xs, i, A, xi2yA) {
  return seemsArrayLike(xs) ? elemsI(xs, i, A, xi2yA) : A.of(xs)
}