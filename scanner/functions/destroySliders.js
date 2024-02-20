function destroySliders(panel)  {
        panel.find(".fallback").show();
        panel.find("demoWidget").slider("destroy");
        panel.find(".sliderValue").hide();
    }