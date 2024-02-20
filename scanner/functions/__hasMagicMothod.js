function __hasMagicMothod(instance) {
  return !!instance.__get__ || !!instance.__set__;
}