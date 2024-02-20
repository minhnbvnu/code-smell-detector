function ReduceComputedPropertyInstanceMeta(context, propertyName, initialValue) {
  this.context = context;
  this.propertyName = propertyName;
  this.cache = metaFor(context).cache;

  this.dependentArrays = {};
  this.sugarMeta = {};

  this.initialValue = initialValue;
}