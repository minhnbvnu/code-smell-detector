function isInsideScopeKind(ctx, scopekind) {
      if (ctx == null) {
        return false;
      }
      if (ctx.scopekind === scopekind) {
        return true;
      }
      return isInsideScopeKind(ctx.prev, scopekind);
    }