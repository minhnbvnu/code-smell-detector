function Application() {
  this.__router = new Router();
  this.__initializer = new bootable.Initializer();
  this.__controllers = {};
  this._formats = {};
  this._helpers = {};
  this._dynamicHelpers = {};
  this.__datastores = [];
  
  this.__controllerResolver = new Resolver();
  this.__controllerInstantiator = new Instantiator();
  this.__viewResolver = new Resolver();
  
  // Sugary API
  this.controllers = {};
  this.controllers.resolve = { use: this.__controllerResolver.use.bind(this.__controllerResolver) };
  this.controllers.instantiate = { use: this.__controllerInstantiator.use.bind(this.__controllerInstantiator) };

  this.views = {};
  this.views.resolve = this.__viewResolver.resolve.bind(this.__viewResolver);
  this.views.resolve.use = this.__viewResolver.use.bind(this.__viewResolver);
}