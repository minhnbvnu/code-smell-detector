function objectGroup(group) {
        for(index in group.objects) {
            var object = group.objects[index];
            if(object.type=="playerStart") {
                var playerStart = {x:object.x, y:object.y};
                sjs.map.playerStart = playerStart;
            }
            if(object.type=="teleport") {
                var shape = {x:object.x, y:object.y, w:object.width, h:object.height, type:"rectangle", class:"teleport", map:object.properties.map};
                sjs.map.activeObjects.push(shape);
            }
            if(object.type == "position") {
                var position = {x:object.x, y:object.y};
                sjs.map.positions[position.name] = position;
            }
            if(object.type == "dialog") {
                var shape = {x:object.x, y:object.y, w:object.width, h:object.height, type:"rectangle", class:"dialog", dialog:object.properties};
                var arrow = scene.Sprite("arrow.png", {w:24, h:28, x:shape.x, y:shape.y-28});
                shape.sprite = arrow;
                sjs.map.activeObjects.push(shape);
            }
            if(object.type == "entity") {
                var shape = {x:object.x, y:object.y, w:48, h:48, type:"rectangle", class:"entity", gid:object.gid, props:object.properties};
                var entity = sjs.map.getSprite(object.gid);
                shape.sprite = entity;
                sjs.map.activeObjects.push(shape);
            }
        }
    }