function Dao(config, log, next) {
  var self = this;

  DaoMongo.apply(this, arguments);

  // protocol + base url
  this._baseUrl = config.proto_public + config.domain_public;

  this._modelPrototype = require('../models/prototype.js').BipModel;

  // @todo refactor to not rely on mongoose models
  var modelSrc = {
    // mapper
    'bip' : require('../models/bip').Bip,
    'bip_share' : require('../models/bip_share').BipShare,
    'bip_log' : require('../models/bip_log').BipLog,
    'channel' : require('../models/channel').Channel,
    'channel_log' : require('../models/channel_log').ChannelLog,
    'domain' : require('../models/domain').Domain,

    'transform_default' : require('../models/transform_default').TransformDefault,

    // account
    'account' : require('../models/account').Account,
    'account_auth' : require('../models/account_auth').AccountAuth,
    'account_option' : require('../models/account_option').AccountOption,

    'stats_account' : require('../models/stats_account').StatsAccount,
    'stats_account_network' : require('../models/stats_account_network').StatsAccountNetwork,
  }

  this.models = { };
  for (var key in modelSrc) {
    this.registerModelClass(modelSrc[key]);
  }
}