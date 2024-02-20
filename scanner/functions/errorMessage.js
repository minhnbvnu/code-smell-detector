function errorMessage(isCommonJs) {
  const baseMessage = 'Unallowed reassignment';
  return baseMessage + (isCommonJs ? '. You may want to activate the `commonjs` option for this rule' : '');
}