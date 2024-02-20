function watchHandler() {
            self.chart = $scope.$eval($attrs.chart);
            drawAsync();
        }