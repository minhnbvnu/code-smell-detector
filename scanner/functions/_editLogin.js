function _editLogin(field) {
      if (value == table[row][field]) {
        return;
      }
      let existingLogin = table[row].clone();
      table[row][field] = value;
      table[row].timePasswordChanged = Date.now();
      Services.logins.modifyLogin(existingLogin, table[row]);
      signonsTree.invalidateRow(row);
    }