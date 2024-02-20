function getCreatedNumber(type, system) {
      var pool = type == 'material' ? '_materialPool' : '_targetPool';
      var renderer = system.renderers[0];

      return renderer[pool].cID;
    }