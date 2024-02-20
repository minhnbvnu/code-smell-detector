function rgbAdjust(v) {
        if (v instanceof img.Img) {
            var image = v;
            var layer = image.toLayer(false);
            layer.addFilter('rgbAdjust', {r: red, g: green, b: blue, a: alpha});
            return image.withCanvas(layer.toCanvas());
        } else if (v instanceof vg.Group) {
            var newShapes = [];
            for (var i = 0; i < v.shapes.length; i += 1) {
                newShapes.push(rgbAdjust(v.shapes[i]));
            }
            return new vg.Group(newShapes);
        } else if (v instanceof vg.Path) {
            var p = v.clone();
            p.fill = rgbAdjust(p.fill);
            p.stroke = rgbAdjust(p.stroke);
            return p;
        }
        var c = v;
        if (!(c instanceof vg.Color)) {
            c = vg.Color.parse(c);
        }
        return new vg.Color(c.r + red, c.g + green, c.b + blue, c.a + alpha);
    }