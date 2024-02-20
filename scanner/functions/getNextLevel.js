function getNextLevel () {
      if (!level.value) return
      const index = levels.findIndex(val => val === level.value)

      return index < (levels.length - 1)
        ? levels[index + 1]
        : undefined
    }