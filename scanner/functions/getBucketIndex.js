function getBucketIndex(key) {
        var index = virtHashCode(key) % buckets.length;
        return index < 0 ? buckets.length + index : index
      }