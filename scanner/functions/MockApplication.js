function MockApplication() {
  this._controllers = {};
  this._formats = {};
  
  this.views = { resolve: snakeCase };
}