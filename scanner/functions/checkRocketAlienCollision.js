function checkRocketAlienCollision() {
    if (contains(aliensY, rocketY)) {
        var i;
        for (i=aliens.length - 1; i >= 0; i--) {
            if (aliens[i]["active"] && (rocketY - aliens[i]["y"] < 5)) {
                var rangeX = []
                rangeX.push(aliens[i]["x"]);

                for (k=aliens[i]["x"]; k<aliens[i]["x"]+aliensWidth; k++) {
                    rangeX.push(k);
                }
                
                if(contains(rangeX, rocketX)) {
                    collisionDetected = true;
                    aliens[i]["status"] = "killed";
                    // Aliens might be updated before new pods are fetched
                    for (j=0; j<pods.length; j++) {
                        if (pods[j].name == aliens[i].name) {
                            pods[j].status = "killed";
                        }
                    }
                    if (nodes.some((node) => node.name == aliens[i]["name"])) {
                        aliens[i]["active"] = false;
                        startChaosNode(aliens[i]["name"]);
                    }
                    else {
                        deletePods(aliens[i]["name"]);
                    }
                    return true;
                }
            }
        } 
    }
    return false;
}