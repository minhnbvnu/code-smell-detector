function setupAndDraw() {
            googleChartService.setup($element,
            self.chart.type,
            self.chart.data,
            self.chart.view,
            self.chart.options,
            self.chart.formatters,
            self.chart.customFormatters);

            $timeout(drawChartWrapper);
        }