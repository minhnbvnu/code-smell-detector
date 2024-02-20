function guarded() {
      return (
        ErrorUtils.applyWithGuard(
          fun,
          context || this,
          arguments,
          null,
          name
        )
      );
    }