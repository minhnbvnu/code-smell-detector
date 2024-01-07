constructor(params = {}) {
    this.request = params.request || window.fetch;
    this.alwaysReport = params.hasOwnProperty('alwaysReport')
      ? params.alwaysReport
      : false;
    this.reportPreviousErrors = params.hasOwnProperty('reportPreviousErrors')
      ? params.reportPreviousErrors
      : true;
    this.resourcePath = this.normalizePath(
      params.resourcePath || process.resourcesPath
    );
    this.reportedErrors = [];
    this.reportedAssertionFailures = [];
  }