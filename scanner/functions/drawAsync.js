function drawAsync() {
            googleChartService.getReadyPromise()
                .then(draw);
        }