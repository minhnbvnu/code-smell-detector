function SessionTelemetry(state) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        state: true
                    };
                    this.state = state;
                }