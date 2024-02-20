function getEmitterPos(system) {
      var e = system.emitters[0];

      return (
        Math.round(e.p.x) + ',' + Math.round(e.p.y) + ',' + Math.round(e.p.z)
      );
    }