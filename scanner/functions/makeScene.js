function makeScene() {

        var width, height, theScene;

        width = Math.min(window.innerWidth, 600);
        height = Math.min(window.innerHeight, 400);

        theScene = SpriteJS.Scene({
            'w': width,
            'h': height,
            'useCanvas': true,
            'autoPause': false
        });
        
        return theScene;
    }