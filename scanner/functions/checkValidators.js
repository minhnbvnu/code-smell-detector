function checkValidators(types, name, value) {
  return _(types).any(function(type) {
    let validator = null;
    switch(type) {
      case 'messages':
        validator = validators.messages;
        break;
      case 'shippingOptions':
        validator = validators.shippingOptions;
        break;
      case 'invoiceItems':
        validator = validators.invoiceItems;
        break;
      case 'buffer':
        validator = validators.buffer;
        break;
      case 'hash':
        validator = function(value) {
          // it's tricky, exclude any object that resemble a message, which is an hash that contains messageId and chatId
          // also the has could be nested in the payload, in that case if the payload has an attribute with the same
          // name of the variable I'm searching for, skip it
          return _.isObject(value) && value.chatId == null && value.messageId == null && value[name] == null;
        };
        break;
      case 'float':
        validator = validators.float;
        break;
      case 'number':
        validator = validators.number;
        break;
      case 'boolean':
        validator = validators.boolean;
        break;
      case 'string':
        validator = validators.string;
        break;
      case 'array':
        validator = validators.array;
        break;
      case 'variable':
        validator = validators.variable;
        break;
      case 'integer':
        validator = validators.integer;
        break;
      case 'params':
          validator = value => {
            return _.isArray(value) && !_.isEmpty(value) && value.every(param => {
              return _.isObject(param) && !_.isEmpty(param.platform) && !_.isEmpty(param.name) && param.value != null;
            });
          };
        break;
      case 'arrayOfString':
        validator = function(value) {
          return _.isArray(value) && _(value).all(function(obj) {
            return _.isString(obj);
          });
        };
        break;
      case 'object':
        validator = value => _.isObject(value);
        break;
      case 'arrayOfObject':
        validator = function(value) {
          return _.isArray(value) && _(value).all(function(obj) {
            return _.isObject(obj);
          });
        };
        break;
      case 'stringOrNumber':
        validator = value => (_.isString(value) && !_.isEmpty(value)) || _.isNumber(value);
        break;
      case 'buttons':
        validator = function(value) {
          return _.isArray(value) && !_.isEmpty(value) && _(value).all(function(button) {
            // allow buttons with a type or with subitems
            return button != null && (button.type != null || button.items != null);
          });
        };
        break;
      case 'filepath':
        validator = value => _.isString(value) && validators.filepath(value);
        break;
      case 'url':
        validator = value => _.isString(value) && validators.url(value);
        break;
      case 'stringWithVariables':
        validator = value => {
          return _.isString(value) && value.match(/\{\{[A-Za-z0-9]*\}\}/);
        }
        break;
      case 'arrayOfEntities':
        validator = function(value) {
          return _.isArray(value) && !_.isEmpty(value) && _(value).all(entity => {
            return entity != null && !_.isEmpty(entity.name) &&
              (entity.aliases == null || (_.isArray(entity.aliases) && _(entity.aliases).all(alias => _.isString(alias))));
          });
        };
        break;
      case 'arrayOfFacebookTemplateElements':
        validator = function(value) {
          return _.isArray(value) && _(value).all((obj) => {
            return ['generic', 'product'].includes(obj.templateType);
          });
        };
        break;
      case 'whatsappTemplateParams':
        validator = function(value) {
          return _.isArray(value) && !_.isEmpty(value) && _(value).all((obj) => {
            if (!['currency', 'date_time', 'document', 'image', 'text', 'video'].includes(obj.type)) {
              return false;
            }
            if ((obj.type === 'text' && !_.isEmpty(obj.text))
              || (obj.type === 'video' && !_.isEmpty(obj.video))
              || (obj.type === 'date_time' && !_.isEmpty(obj.date_time) && !_.isEmpty(obj.date_time.fallback_value))
              || (obj.type === 'image' && !_.isEmpty(obj.image))
              || (obj.type === 'document' && !_.isEmpty(obj.document))
              || (obj.type === 'currency' && !_.isEmpty(obj.currency.amount_1000) && !_.isEmpty(obj.currency.code))) {
              return true;
            }
          });
        };
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`Unable to find a validator for type "${type}" in extractValue`);
    }
    return validator(value);
  });
}