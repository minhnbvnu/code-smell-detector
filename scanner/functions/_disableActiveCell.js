function _disableActiveCell () {
      const activeCellId = self._activeCell
      if (activeCellId) {
        let cellEditor = self.refs[activeCellId]
        if (cellEditor) {
          // console.log('DISABLING CELL EDITOR', activeCellId)
          cellEditor.extendProps({ disabled: true })
        }
        self._activeCell = null
      }
    }