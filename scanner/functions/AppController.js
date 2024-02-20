function AppController() {
    this.handleWarning = bind(this.handleWarning, this);
    this.handleError = bind(this.handleError, this);
    this.inProgress = false;
    this.$spinner = $('#net-spinner');
    this.$netBox = $('#net-container');
    this.$netError = $('#net-error');
    this.$netWarn = $('#net-warning');
    this.svg = '#net-svg';
    this.setupErrorHandler();
  }