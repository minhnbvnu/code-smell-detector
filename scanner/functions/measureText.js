function measureText(text) {
      return options.useFastTextMeasure ? measureAvgWidth(text) : preciseMeasure(text);
    }