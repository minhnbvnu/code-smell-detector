function _continueSetup() {
                if (!angular.isDefined(_chartWrapper)) {
                    _chartWrapper = new $google.visualization.ChartWrapper({
                        chartType: _chartType,
                        dataTable: _data,
                        view: _view,
                        options: _options,
                        containerId: _element[0]
                    });
                    _registerListenersWithGoogle(_chartWrapper, wrapperListeners);
                }
                else {
                    _chartWrapper.setChartType(_chartType);
                    _chartWrapper.setDataTable(_data);
                    _chartWrapper.setView(_view);
                    _chartWrapper.setOptions(_options);
                }

                if (!_formatManager) {
                    _formatManager = new FormatManager($google);
                }

                if (_formatManager.applyFormats(_chartWrapper.getDataTable(),
                        _formatters, _customFormatters).requiresHtml) {
                    _chartWrapper.setOption('allowHtml', true);
                }

                _needsUpdate = false;
            }