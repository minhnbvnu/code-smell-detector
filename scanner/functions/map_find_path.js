function map_find_path(map, start, goal, edgeCost, costLayer, use_sprite_id) {
    if (use_sprite_id === undefined) { use_sprite_id = true; }
    
    if (is_array(edgeCost)) {
        // Create an edgeTable
        const edgeTable = new Map();
        for (let i = 0; i < edgeCost.length; i += 2) {
            edgeTable.set(use_sprite_id ? edgeCost[i].id : edgeCost[i], edgeCost[i + 1]);
        }
        
        edgeCost = function (A, B, m) {
            const sprite = get_map_sprite(map, B, costLayer);
            if (sprite === undefined) { return 1; }
            const cost = edgeTable.get(use_sprite_id ? sprite.id : sprite);
            return (cost === undefined) ? 1 : cost;
        };
    }

    function estimatePathCost(A, B, m) {
        let dx = $Math.abs(A.x - B.x);
        let dy = $Math.abs(A.y - B.y);
        if (map.loop_x) { dx = $Math.min(dx, map.size.x - 1 - dx); }
        if (map.loop_y) { dy = $Math.min(dy, map.size.y - 1 - dy); }
        return dx + dy;
    }

    function getNeighbors(node, m) {
        const neighbors = [];
        if (node.x > 0) {
            neighbors.push({x:node.x - 1, y:node.y});
        } else if (map.loop_x) {
            neighbors.push({x:map.size.x - 1, y:node.y});
        }

        if (node.x < map.size.x - 1) {
            neighbors.push({x:node.x + 1, y:node.y});
        } else if (map.loop_x) {
            neighbors.push({x:0, y:node.y});
        }

        if (node.y > 0) {
            neighbors.push({x:node.x, y:node.y - 1});
        } else if (map.loop_y) {
            neighbors.push({x:node.x, y:map.size.y - 1});
        }

        if (node.y < map.size.y + 1 - 1) {
            neighbors.push({x:node.x, y:node.y + 1});
        } else if (map.loop_y) {
            neighbors.push({x:node.x, y:0});
        }
        
        return neighbors;
    }

    return find_path(floor(start), floor(goal), estimatePathCost, edgeCost, getNeighbors, function (N) { return N.x + N.y * map.size.x * 2; }, map);
}