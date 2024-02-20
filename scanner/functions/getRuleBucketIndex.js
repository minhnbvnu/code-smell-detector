function getRuleBucketIndex(row, column) {
            Debug.assert(row <= 162 /* LastKeyword */ && column <= 162 /* LastKeyword */, "Must compute formatting context from tokens");
            return row * mapRowLength + column;
        }