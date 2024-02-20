function applyInfo(proto, info, lifecycle, excludeProps) {
      copyProperties(info, proto, excludeProps);
      for (let p in lifecycleProps) {
        if (info[p]) {
          lifecycle[p] = lifecycle[p] || [];
          lifecycle[p].push(info[p]);
        }
      }
    }