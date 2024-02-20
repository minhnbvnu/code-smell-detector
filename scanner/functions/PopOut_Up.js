function PopOut_Up(scroller) {
    Menu_ClearInterval();
    var panel;
    if (scroller) {
        panel = scroller.parentNode
    }
    else {
        panel = __scrollPanel;
    }
    if (panel && panel.offset && panel.offset > 0) {
        PopOut_Scroll(panel, -2);
        __scrollPanel = panel;
        PopOut_ShowScrollers(panel);
        PopOut_Stop();
        __scrollPanel.interval = window.setInterval("PopOut_Up()", 8);
    }
}