function statisticsPauseDealer(startOrStop) {
    if (startOrStop === "start") {
        tempDate = new Date();
        recorderDate = tempDate;
    } else {
        statisticsWriter();
        traySolution(isFullscreenMode);
    }
}