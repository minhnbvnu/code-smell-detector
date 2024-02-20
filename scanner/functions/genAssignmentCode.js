function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  }
}