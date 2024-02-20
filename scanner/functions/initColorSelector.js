function initColorSelector () {
        var obj = editor.queryCommandValue('background');
        if (obj) {
            var color = obj['background-color'],
                repeat = obj['background-repeat'] || 'repeat',
                image = obj['background-image'] || '',
                position = obj['background-position'] || 'center center',
                pos = position.split(' '),
                x = parseInt(pos[0]) || 0,
                y = parseInt(pos[1]) || 0;

            if(repeat == 'no-repeat' && (x || y)) repeat = 'self';

            image = image.match(/url[\s]*\(([^\)]*)\)/);
            image = image ? image[1]:'';
            updateFormState('colored', color, image, repeat, x, y);
        } else {
            updateFormState();
        }

        var updateHandler = function () {
            updateFormState();
            updateBackground();
        }
        domUtils.on($G('nocolorRadio'), 'click', updateBackground);
        domUtils.on($G('coloredRadio'), 'click', updateHandler);
        domUtils.on($G('url'), 'keyup', function(){
            if($G('url').value && $G('alignment').style.display == "none") {
                utils.each($G('repeatType').children, function(item){
                    item.selected = ('repeat' == item.getAttribute('value') ? 'selected':false);
                });
            }
            updateHandler();
        });
        domUtils.on($G('repeatType'), 'change', updateHandler);
        domUtils.on($G('x'), 'keyup', updateBackground);
        domUtils.on($G('y'), 'keyup', updateBackground);

        initColorPicker();
    }