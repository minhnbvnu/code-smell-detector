function statisticsUpdate() {
                plot_statistics.setData([getRandomData()]);
                plot_statistics.draw();
                setTimeout(statisticsUpdate, updateInterval);
            }