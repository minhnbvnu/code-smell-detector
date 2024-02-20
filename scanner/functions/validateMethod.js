function validateMethod( method, context ) {
    // Validate method and context
    if ( typeof method === 'string' ) {
      // Validate method
      if ( context === undefined || context === null ) {
        throw new Error( 'Method name "' + method + '" has no context.' );
      }
      if ( !( method in context ) ) {
        // Technically the method does not need to exist yet: it could be
        // added before call time. But this probably signals a typo.
        throw new Error( 'Method not found: "' + method + '"' );
      }
      if ( typeof context[method] !== 'function' ) {
        // Technically the property could be replaced by a function before
        // call time. But this probably signals a typo.
        throw new Error( 'Property "' + method + '" is not a function' );
      }
    } else if ( typeof method !== 'function' ) {
      throw new Error( 'Invalid callback. Function or method name expected.' );
    }
  }