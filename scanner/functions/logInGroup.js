function logInGroup(group, f) {
  if(console.group) console.group(group)
  try {
    f()
  } finally {
    if(console.groupEnd) console.groupEnd()
  }
}