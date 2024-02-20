function mockNpm (versions, depName, latestTag) {
  depName = depName || 'testDepName'

  var npmData = {}
  var time = {}

  versions.forEach(function (value, index) { time[value] = new Date(index).toISOString() })
  latestTag = latestTag || versions[versions.length - 1]
  versions.sort(function (a, b) { return semver.compare(a, b) })
  npmData[latestTag] = { versions: versions, time: time }

  // Mock out NPM
  return {
    load: function (config, cb) {
      cb()
    },
    commands: {
      view: function (args, silent, cb) {
        process.nextTick(function () {
          if (args[0] === depName) {
            cb(null, npmData)
          } else {
            cb(new Error(), null)
          }
        })
      }
    }
  }
}