function setUpGUI() {

        /*
        document.getElementById("container").addEventListener("click", function () {
            // Enable fullscreen
            //THREEx.FullScreen.request();
        });
        */
        
        // Control panel
        
        var gui = new dat.GUI();
        var params = {speed: 0.1};
        var spdCtrl = gui.add(params, 'speed', 0, 0.5);
        spdCtrl.onChange(function (value) {
            rotationSpeed = value;
        });
        gui.closed = true;
        
    }