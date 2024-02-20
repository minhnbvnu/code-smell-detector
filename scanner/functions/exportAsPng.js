function exportAsPng() {
    var date = new Date();
    bootbox.prompt({
        title: "Enter output filename (without '.9.png')",
        value: "shadow_" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds(),
        callback: function(result) {
            if (result !== null && result !== "") {
                //Show ninepatches If hidden when exporting
                var hideNinepatchesTmp = false;
                var showContentAreaTmp = false;
                if (hideNinepatches || showContentArea) {
                    hideNinepatchesTmp = hideNinepatches;
                    showContentAreaTmp = showContentArea;
                    showContentArea = false;
                    hideNinepatches = false;
                    redraw();
                }

                //Use BlobHD If supported
                if (canvas.toBlobHD) {
                    canvas.toBlobHD(function (blob) {
                        saveAs(blob, result + ".9.png");
                    });
                } else {
                    canvas.toBlob(function (blob) {
                        saveAs(blob, result + ".9.png");
                    });
                }

                if (hideNinepatchesTmp || showContentAreaTmp) {
                    hideNinepatches = hideNinepatchesTmp;
                    showContentArea = showContentAreaTmp;
                    redraw();
                }
            }
        }
    });
}