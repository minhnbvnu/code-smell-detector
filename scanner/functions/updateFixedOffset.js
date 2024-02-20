function updateFixedOffset(){
        var layer = document.getElementById('edui_fixedlayer');
        uiUtils.setViewportOffset(layer, {
            left: 0,
            top: 0
        });
//        layer.style.display = 'none';
//        layer.style.display = 'block';

        //#trace: 1354
//        setTimeout(updateFixedOffset);
    }