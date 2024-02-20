function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }