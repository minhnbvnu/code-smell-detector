function DataPoint() {
                        _super.apply(this, arguments);
                        this.aiDataContract = {
                            name: true,
                            kind: false,
                            value: true,
                            count: false,
                            min: false,
                            max: false,
                            stdDev: false
                        };
                    }