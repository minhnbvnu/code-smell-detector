function exposeOverrideableMethod(Class, classKey, method, brMethod = method) {
  /** @type {function(TClass): BookReader} */
  const classToBr = cls => cls.br;
  /** @type {function(BookReader): TClass} */
  const brToClass = br => br._overrideable[classKey];
  exposeOverrideable(Class, method, classToBr, BookReader, brMethod, brToClass);
}