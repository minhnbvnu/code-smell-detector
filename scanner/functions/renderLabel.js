function renderLabel(column, columnIndex) {
      if (this.isSelectionCell(this.table, columnIndex)) {
        const allCheck = this.table.bodyData.every(row => row._isChecked);
        const indeterminate = !allCheck && this.table.bodyData.some(row => row._isChecked);
        return <Checkbox
          indeterminate={ indeterminate }
          value={ allCheck }
          onOn-change={ checked => this.toggleAllChecked(checked) }
          ></Checkbox>;
      }
      return column.label ? column.label : '';
    }