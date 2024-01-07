constructor(file, properties, seacAnalysisEnabled) {
      this.bytes = file.getBytes();
      this.properties = properties;
      this.seacAnalysisEnabled = !!seacAnalysisEnabled;
    }