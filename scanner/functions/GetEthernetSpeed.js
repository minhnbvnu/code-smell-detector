function GetEthernetSpeed (index, in_speed, out_speed) {
        updateEthernet();
        if (index >= 0 && index < ethernetEntry.length) {
          var entry = ethernetEntry[index];
          in_speed.value = entry.in_speed;
          out_speed.value = entry.out_speed;
        }
      }