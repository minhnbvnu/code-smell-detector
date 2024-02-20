function renderCell({ prop }, columnIndex) {
      if (columnIndex === 0) {
        return this.table.sumText;
      }
      const rows = this.table.bodyData;
      const values = rows.map(row => Number(row[prop]));
      const precisions = [];
      let notNumber = true;
      values.forEach((value) => {
        if (!isNaN(value)) {
          notNumber = false;
          const decimal = value.toString().split('.')[1];
          precisions.push(decimal ? decimal.length : 0);
        }
      });
      const precision = Math.max.apply(null, precisions);
      if (!notNumber) {
        return values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return parseFloat((prev + curr).toFixed(precision));
          }
          return prev;
        }, 0);
      }
      return '';
    }