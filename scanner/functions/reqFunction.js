function reqFunction(o) {
  if (!(I.isFunction(o) && (o[I.LENGTH] === 4 || o[I.LENGTH] <= 2)))
    errorGiven(expectedOptic, o, opticIsEither)
}