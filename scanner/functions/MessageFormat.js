function MessageFormat(locale, pluralFunc, formatters) {
  this.lc = [locale];  
  this.runtime.pluralFuncs = {};
  this.runtime.pluralFuncs[this.lc[0]] = pluralFunc;
  this.runtime.fmt = {};
  if (formatters) for (var f in formatters) {
    this.runtime.fmt[f] = formatters[f];
  }
}