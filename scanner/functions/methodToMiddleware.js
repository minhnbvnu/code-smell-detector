function methodToMiddleware(controllerBeanFullName, _route) {
  return function classControllerMiddleware(...args) {
    const controller = this.bean._getBean(controllerBeanFullName);
    if (!controller) {
      throw new Error(`controller not found: ${controllerBeanFullName}`);
    }
    if (!controller[_route.action]) {
      throw new Error(`controller action not found: ${controllerBeanFullName}.${_route.action}`);
    }
    return controller[_route.action](...args);
  };
}