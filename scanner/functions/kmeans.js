function kmeans(vectors) {
    var n = vectors.length,
        assignments = [],
        clusterSizes = [],
        repeat = 1,
        iterations = 0,
        centroids = science_stats_kmeansRandom(k, vectors),
        newCentroids,
        i,
        j,
        x,
        d,
        min,
        best;

    while (repeat && iterations < maxIterations) {
      // Assignment step.
      j = -1; while (++j < k) {
        clusterSizes[j] = 0;
      }

      i = -1; while (++i < n) {
        x = vectors[i];
        min = Infinity;
        j = -1; while (++j < k) {
          d = distance.call(this, centroids[j], x);
          if (d < min) {
            min = d;
            best = j;
          }
        }
        clusterSizes[assignments[i] = best]++;
      }

      // Update centroids step.
      newCentroids = [];
      i = -1; while (++i < n) {
        x = assignments[i];
        d = newCentroids[x];
        if (d == null) newCentroids[x] = vectors[i].slice();
        else {
          j = -1; while (++j < d.length) {
            d[j] += vectors[i][j];
          }
        }
      }
      j = -1; while (++j < k) {
        x = newCentroids[j];
        d = 1 / clusterSizes[j];
        i = -1; while (++i < x.length) x[i] *= d;
      }

      // Check convergence.
      repeat = 0;
      j = -1; while (++j < k) {
        if (!science_stats_kmeansCompare(newCentroids[j], centroids[j])) {
          repeat = 1;
          break;
        }
      }
      centroids = newCentroids;
      iterations++;
    }
    return {assignments: assignments, centroids: centroids};
  }