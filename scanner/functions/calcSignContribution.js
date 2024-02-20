function calcSignContribution(significance0, sign0, significance1, sign1) {
      if (significance1) {
        if (!sign1)
          return significance0 ? (!sign0 ? 1 : 0) : 1;
        else
          return significance0 ? (!sign0 ? 0 : -1) : -1;
      } else
        return significance0 ? (!sign0 ? 1 : -1) : 0;
    }