function isEqual(a, b) {
  return (
    a.Subtype === b.Subtype &&
    a.Params.CheckSum.toString() === b.Params.CheckSum.toString() &&
    a.Params.Size === b.Params.Size &&
    a.Params.CreationDate === b.Params.CreationDate &&
    a.Params.ModDate === b.Params.ModDate
  );
}