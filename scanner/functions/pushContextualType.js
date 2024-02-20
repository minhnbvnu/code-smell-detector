function pushContextualType(node, type, isCache) {
                contextualTypeNodes[contextualTypeCount] = node;
                contextualTypes[contextualTypeCount] = type;
                contextualIsCache[contextualTypeCount] = isCache;
                contextualTypeCount++;
            }