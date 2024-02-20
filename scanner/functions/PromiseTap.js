function PromiseTap(t, Promise) {
  this.t = t
  this.testedClassMethods = []
  this.testedInstanceMethods = []
  this.Promise = Promise
}