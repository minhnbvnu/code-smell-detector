function storage_or_not() {
      if(is_storage(token)) {
        if(stmt.flags & DECL_ALLOW_STORAGE) {
          state.unshift(keyword()) 
          return Advance
        } else {
          return unexpected('storage is not allowed here') 
        }
      } else {
        state.fake(mknode(PLACEHOLDER, {data: '', position: token.position}))
        return Advance
      }
    }