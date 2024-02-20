function freezeObjectOfObjects(xs) {
  if (xs) for (const k in xs) I.freeze(xs[k])
  return I.freeze(xs)
}