function _getDom() {
        var doc = document,
            hand,
            arr = [],
            scale = doc.createElement('div');

        scale.id = 'J_scaleCon';
        scale.className = 'scale';
        for (var i = 0; i < 8; i++) {
            arr.push("<span class='hand" + i + "'></span>");
        }
        scale.innerHTML = arr.join("");
        return scale;
    }