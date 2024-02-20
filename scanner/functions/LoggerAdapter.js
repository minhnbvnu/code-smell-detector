function LoggerAdapter(logger) {
            this.logger = logger;
            this._information = this.logger.information();
            this._debug = this.logger.debug();
            this._warning = this.logger.warning();
            this._error = this.logger.error();
            this._fatal = this.logger.fatal();
        }