function launchFullscreen() {
        if(
            document.documentElement.requestFullscreen
        ){
            document.documentElement.requestFullscreen();
        }else if(
            document.documentElement.mozRequestFullScreen
        ){
            document.documentElement.mozRequestFullScreen();
        }else if(
            document.documentElement.webkitRequestFullscreen
        ){
            document.documentElement.webkitRequestFullscreen();
        }else if(
            document.documentElement.msRequestFullscreen
        ){
            document.documentElement.msRequestFullscreen();
        }
    }