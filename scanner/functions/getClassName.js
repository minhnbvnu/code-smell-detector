function getClassName(type, { headerAlign, prop }) {
      const certainType = this.validateType(type, ['cell', 'inner'], 'getClassName');
      const classList = [];
      if (certainType.cell) {
        classList.push(`${this.prefixCls}__header-cell`);
        if (this.table.border) {
          classList.push(`${this.prefixCls}--border-cell`);
        }
        if (['center', 'right'].indexOf(headerAlign) > -1) {
          classList.push(`${this.prefixCls}--${headerAlign}-cell`);
        }
      }
      if (certainType.inner) {
        classList.push(`${this.prefixCls}__cell-inner`);
        if (this.table.treeType && this.table.firstProp === prop) {
          classList.push(`${this.prefixCls}--firstProp-header-inner`);
        }
      }
      return classList.join(' ');
    }