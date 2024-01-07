function compatibleInstance(thrown, errorLike) {
    return errorLike instanceof Error && thrown === errorLike;
  }