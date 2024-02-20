function checkNewVersionDocument (doc) {
  if (doc && doc.version && doc._id && __meteor_runtime_config__.autoupdate.versions[doc._id]) {
    if (__meteor_runtime_config__.autoupdate.versions[doc._id].version !== doc.version) {
      reload()
    }
  }
}