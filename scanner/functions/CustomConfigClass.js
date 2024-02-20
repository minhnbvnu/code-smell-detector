function CustomConfigClass() {
          this._text = 'INSERT INTO ' + TABLE_PREPARED + ' (' + PK + ',' + COL
          this._text += ') VALUES($1, $2);'
        }