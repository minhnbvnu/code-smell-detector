function onZoomClick(e, zoomOut) {
            var c = plot.offset();
            c.left = e.pageX - c.left;
            c.top = e.pageY - c.top;
            if (zoomOut)
                plot.zoomOut({ center: c });
            else
                plot.zoom({ center: c });
        }