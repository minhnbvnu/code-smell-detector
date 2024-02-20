function _ExceptionDetails(exception) {
                    _super.call(this);
                    this.aiDataContract = {
                        id: false,
                        outerId: false,
                        typeName: true,
                        message: true,
                        hasFullStack: false,
                        stack: false,
                        parsedStack: []
                    };
                    this.typeName = Telemetry.Common.DataSanitizer.sanitizeString(exception.name || ApplicationInsights.Util.NotSpecified);
                    this.message = Telemetry.Common.DataSanitizer.sanitizeMessage(exception.message || ApplicationInsights.Util.NotSpecified);
                    var stack = exception["stack"];
                    this.parsedStack = this.parseStack(stack);
                    this.stack = Telemetry.Common.DataSanitizer.sanitizeException(stack);
                    this.hasFullStack = ApplicationInsights.Util.isArray(this.parsedStack) && this.parsedStack.length > 0;
                }