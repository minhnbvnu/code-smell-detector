function getMeteorPort () {
  const reg = /:\/\/.+:(\d+)/gi
  const result = reg.exec(Meteor.absoluteUrl())
  if (result && result.length >= 2) {
    return parseInt(result[1]) + 3
  }
}