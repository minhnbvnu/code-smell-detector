function removeDependentAndCheck(targetId, from) {
        var dependsOn = tocheck[targetId];
        if (!dependsOn) return false;
        var i = dependsOn.indexOf(from);
        if (i < 0) return false;
        dependsOn.splice(i, 1);
        if (dependsOn.length > 0) return false;
        delete tocheck[targetId];
        return true
      }