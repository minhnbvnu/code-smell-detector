function _handleReady() {
                // When the chartWrapper is ready, check to see if the inner chart
                // has changed. If it has, re-register listeners onto that chart.
                if (_innerVisualization !== _chartWrapper.getChart()) {
                    _innerVisualization = _chartWrapper.getChart();
                    _registerListenersWithGoogle(_innerVisualization, chartListeners);
                }
            }