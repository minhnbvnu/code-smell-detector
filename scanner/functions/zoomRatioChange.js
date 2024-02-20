function zoomRatioChange() {
    if (store.has("zoom-ratio")) {//zoom page
        const { webFrame } = require('electron');
        webFrame.setZoomFactor(ratioList[store.get("zoom-ratio")]);
    }
}