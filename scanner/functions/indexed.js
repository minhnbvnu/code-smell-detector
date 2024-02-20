function indexed(err) {
      t.error(err)
      collection.geoHaystackSearch(15, 15, { maxDistance: 5, search: {} }, done)
    }