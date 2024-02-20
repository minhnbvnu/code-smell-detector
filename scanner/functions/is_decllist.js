function is_decllist() {
      tokens.unshift(stmt.collected_name)
      delete stmt.collected_name
      state.unshift(decllist())
      return Advance
    }