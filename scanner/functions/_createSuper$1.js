function _createSuper$1(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct$2(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=_getPrototypeOf$2(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf$2(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return function _possibleConstructorReturn$1(self,call){if(call&&("object"===_typeof2(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized$3(self)}(this,result)}}