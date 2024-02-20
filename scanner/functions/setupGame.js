function setupGame(callback) {

        var layer, soundList, direction, doc;

        doc = window.document;

        if (debug.output) {
            debug.fps = doc.getElementById('fps');
            debug.load = doc.getElementById('load');
            debug.dropped = doc.getElementById('dropped');
        }

        layer = Scene.Layer('front', {'useCanvas': true});
        Player = layer.Sprite('assets/images/character.png', {'w': 48, 'h': 46, 'layer': layer});

        Map = new TileMap('assets/maps/town.json', Scene);

        Input = Scene.Input();
        Input.enableCustomEvents = true;

        soundList = [
            {'name': 'swish', 'src': ['assets/sound/swish.ogg'], 'instances': 3},
            {'name': 'click', 'src': ['assets/sound/click.ogg'], 'instances': 4},
            {'name': 'pig', 'src': ['assets/sound/pig.ogg'], 'instances': 3},
            {'name': 'music', 'src': ['assets/sound/abeth.ogg'], 'instances': 1, 'volume': 0.2}
        ];
        SoundJS.addBatch(soundList);
        SoundJS.onLoadQueueComplete = function () {
            //SoundJS.play('music', null, 0.1, true);
            SoundJS.setVolume(0.2, 'pig');
        };

        walk = {
            'down': SpriteJS.Cycle([
                [0, 0, 10], [48, 0, 10], [96, 0, 10], [144, 0, 10]
            ]),
            'up': SpriteJS.Cycle([
                [0, 96, 10], [48, 96, 10], [96, 96, 10], [144, 96, 10]
            ]),
            'left': SpriteJS.Cycle([
                [0, 144, 10], [48, 144, 10], [96, 144, 10], [144, 144, 10]
            ]),
            'right': SpriteJS.Cycle([
                [0, 48, 10], [48, 48, 10], [96, 48, 10], [144, 48, 10]
            ])
        };
        attack = {
            'right': SpriteJS.Cycle([
                [0, 192, 2], [48, 192, 4], [0, 240, 3], [48, 240, 3], [0, 288, 4], [48, 288, 5]
            ]),
            'left': SpriteJS.Cycle([
                [144, 192, 2], [96, 192, 4], [144, 240, 3], [96, 240, 3], [144, 288, 4], [96, 288, 5]
            ])
        };

        for (direction in walk) {
            if (walk.hasOwnProperty(direction)) {
                walk[direction].addSprite(Player);
            }
        }
        for (direction in attack) {
            if (attack.hasOwnProperty(direction)) {
                attack[direction].addSprite(Player);
            }
        }

        currentPlayerAnimation = walk.down;

        callback();
    }