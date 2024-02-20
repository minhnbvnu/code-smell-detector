function checkAliasConflict(previous, current, key) {
    if (previous && previous !== current) {
      util.log('The alias config is conflicted:',
          'key =', '"' + key + '"',
          'previous =', '"' + previous + '"',
          'current =', '"' + current + '"',
          'warn')
    }
  }