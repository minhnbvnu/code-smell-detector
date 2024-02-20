function getBuildOrderFromAnyBuildOrder(anyBuildOrder) {
            return isCircularBuildOrder(anyBuildOrder) ? anyBuildOrder.buildOrder : anyBuildOrder;
        }