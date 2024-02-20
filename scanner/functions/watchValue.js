function watchValue() {
            var chartObject = $scope.$eval($attrs.chart);
            if (angular.isDefined(chartObject) && angular.isObject(chartObject)) {
                return {
                    customFormatters: chartObject.customFormatters,
                    data: chartObject.data,
                    formatters: chartObject.formatters,
                    options: chartObject.options,
                    type: chartObject.type,
                    view: chartObject.view
                };
            }
        }