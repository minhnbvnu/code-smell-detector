function updateLabelMap(labelMap, label, added) {
          labelMap[label] = labelMap[label] || 0;
          labelMap[label] += (added ? 1 : -1);
        }