function maybe_name() {
      if(token.data === ',' && !(stmt.flags & DECL_ALLOW_COMMA)) {
        return state.shift()
      }

      if(token.data === '[') {
        // oh lord.
        state.unshift(quantifier())
        return
      }

      if(token.data === ')') return state.shift()

      if(token.data === ';') {
        return stmt.stage + 3
      }

      if(token.type !== 'ident') {
        console.log(token);
        return unexpected('expected identifier, got '+token.data)
      }

      stmt.collected_name = tokens.shift()
      return Advance      
    }