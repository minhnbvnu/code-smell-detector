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