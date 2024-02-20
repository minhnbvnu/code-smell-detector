function updateNetwork () {
        var inSpeed = {value: 0}, outSpeed = {value: 0};
        GetEthernetSpeed(0, inSpeed, outSpeed);
        var dd = formatSpeed(inSpeed.value);
        var uu = formatSpeed(outSpeed.value);
        UC.networkMonitor.dwElements.forEach(e => e.setAttribute('value', dd));
        UC.networkMonitor.upElements.forEach(e => e.setAttribute('value', uu));
      }