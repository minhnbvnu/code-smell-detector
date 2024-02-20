function shouldAddListener(binding) {
    return Boolean(binding.target) &&
           binding.kind != 'attribute' &&
           binding.kind != 'text' &&
           !binding.isCompound &&
           binding.parts[0].mode === '{';
  }