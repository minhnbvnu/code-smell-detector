function _StackFrame(frame, level) {
                    _super.call(this);
                    this.sizeInBytes = 0;
                    this.aiDataContract = {
                        level: true,
                        method: true,
                        assembly: false,
                        fileName: false,
                        line: false
                    };
                    this.level = level;
                    this.method = "unavailable";
                    this.assembly = ApplicationInsights.Util.trim(frame);
                    var matches = frame.match(_StackFrame.regex);
                    if (matches && matches.length >= 5) {
                        this.method = ApplicationInsights.Util.trim(matches[2]);
                        this.fileName = ApplicationInsights.Util.trim(matches[4]);
                        this.line = parseInt(matches[5]) || 0;
                    }
                    this.sizeInBytes += this.method.length;
                    this.sizeInBytes += this.fileName.length;
                    this.sizeInBytes += this.assembly.length;
                    this.sizeInBytes += _StackFrame.baseSize;
                    this.sizeInBytes += this.level.toString().length;
                    this.sizeInBytes += this.line.toString().length;
                }