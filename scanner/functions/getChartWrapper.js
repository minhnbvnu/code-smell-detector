function getChartWrapper() {
                // Most get functions on this interface return copies,
                // this one should return reference so as to expose the 
                //chart api to users
                return _chartWrapper;
            }