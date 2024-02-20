function genAutomatonLR0(svgId, start) {
    'use strict';
    var ids = {},
        node,
        label,
        keys,
        next,
        i,
        front = 0,
        queue = [start],
        g = new dagreD3.graphlib.Graph().setGraph({}),
        svg = d3.select(svgId),
        inner = svg.select('g'),
        zoom,
        render = new dagreD3.render();

    zoom = d3.behavior.zoom().on("zoom", function () {
        inner.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
    });
    svg.call(zoom);

    function prettyPrintItem(item) {
        return item.head + ' -> ' + item.body.join(' ');
    }

    function prettyPrintItems(items) {
        return items.map(prettyPrintItem, items).join('\n');
    }

    while (front < queue.length) {
        node = queue[front];
        ids[node.key] = node;
        label = 'I' + node.num + '\n===\n' + prettyPrintItems(node.kernel) + '\n---\n' + prettyPrintItems(node.nonkernel);
        g.setNode(node.key, {shape: 'rect', label: label});
        keys = Object.keys(node.edges);
        for (i = 0; i < keys.length; i += 1) {
            next = node.edges[keys[i]];
            g.setEdge(node.key, next.key, {label: keys[i]});
            if (!ids.hasOwnProperty(next.key)) {
                queue.push(next);
            }
        }
        if (node.accept) {
            g.setNode(node.key + '_accept', {shape: 'text', label: 'accept'});
            g.setEdge(node.key, node.key + '_accept', {label: '$'});
        }
        front += 1;
    }

    render.shapes().text = function (parent, bbox, node) {
        var w = bbox.width,
            h = bbox.height,
            rx = Math.min(w / 2, h / 2),
            ry = rx,
            point = {x: w / 2, y: h / 2},
            shapeSvg = parent
                .insert("ellipse", ":first-child")
                .attr("cx", point.x)
                .attr("cy", point.y)
                .attr("rx", rx)
                .attr("ry", ry)
                .attr("fill-opacity", "0")
                .attr("stroke-opacity", "0")
                .attr("transform", "translate(" + (-w / 2) + "," + (-h / 2) + ")");

        node.intersect = function (point) {
            return dagreD3.intersect.ellipse(node, rx, ry, point);
        };
        return shapeSvg;
    };

    g.graph().rankdir = 'LR';
    render(inner, g);
    zoom
        .translate([(svg.attr("width") - g.graph().width) / 2, 20])
        .event(svg);
    svg.attr('height', g.graph().height * 1.5 + 40);
}