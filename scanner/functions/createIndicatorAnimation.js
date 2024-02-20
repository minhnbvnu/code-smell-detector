function createIndicatorAnimation(scrollTimeline) {
    const chip_container = document.querySelector('#info #chips');
    const chips = chip_container.querySelectorAll('li');
    const indicator = document.querySelector('#indicator');
    const width = chips[chips.length - 1].offsetLeft - chips[0].offsetLeft;
    const indicator_effect = new KeyframeEffect(indicator,
        { transform: ['translateX(0px)', 'translateX(' + width + 'px)'] },
        { duration: scrollTimeline.timeRange, iterations: 1, fill: "both" });
    new WorkletAnimation('passthrough', indicator_effect, scrollTimeline).play();
}