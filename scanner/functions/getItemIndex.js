function getItemIndex(collection, target, defaultIndex) {
                var result = defaultIndex;
                collection.every(function(item, index) {
                    if (angular.equals(item, target)) {
                        result = index;
                        return false;
                    }
                    return true;
                });
                return result;
            }