function plurality(value, unit) {
      return formatNumber(value) + ((value === 1) ? LABELS_SINGLUAR[unit] : LABELS_PLURAL[unit]);
    }