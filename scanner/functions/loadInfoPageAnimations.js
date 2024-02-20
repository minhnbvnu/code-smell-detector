function loadInfoPageAnimations() {
    const tabs = document.getElementById('tabs');
    const scrollRange = tabs.scrollWidth - tabs.clientWidth;
    const scrollTimeline = new ScrollTimeline({
        scrollSource: tabs, orientation: 'inline',
        timeRange: scrollRange
    });

    const offsets = Array.prototype.map.call(
        tabs.querySelectorAll('li'), tab => { return tab.offsetLeft - 40 /* margin */})
    console.log(offsets)
    createImageAnimations(scrollTimeline, offsets, tabs.clientWidth);
    createIndicatorAnimation(scrollTimeline);
}