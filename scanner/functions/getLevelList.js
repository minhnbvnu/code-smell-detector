function getLevelList (level) {
    switch (level) {
      case PROVINCE_KEY: return provinces
      case CITY_KEY: return cities
      case AREA_KEY: return areas
      case TOWN_KEY: return towns
    }
  }