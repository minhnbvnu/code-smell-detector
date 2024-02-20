function getDates () {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const beforeTomorrow = new Date(tomorrow)
      beforeTomorrow.setDate(beforeTomorrow.getDate() - 100)

      const tomorrowFormatted = formatDate2(tomorrow)
      const beforeTomorrowFormatted = formatDate2(beforeTomorrow)

      return {
        end: tomorrowFormatted,
        start: beforeTomorrowFormatted
      }
    }