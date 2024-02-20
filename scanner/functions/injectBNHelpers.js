function injectBNHelpers() {
    String.prototype.__defineGetter__('ether', function () {
        return web3.utils.toBN(web3.utils.toWei(this));
    });
    String.prototype.__defineGetter__('gwei', function () {
        return web3.utils.toBN(web3.utils.toWei(this, 'gwei'));
    });
    String.prototype.__defineGetter__('BN', function () {
        return web3.utils.toBN(this);
    });
    Number.prototype.__defineGetter__('BN', function () {
        return web3.utils.toBN(this.toString());
    });
    Number.prototype.__defineGetter__('ether', function () {
        return web3.utils.toBN(web3.utils.toWei(this.toString()));
    });
    Number.prototype.__defineGetter__('gwei', function () {
        return web3.utils.toBN(web3.utils.toWei(this.toString(), 'gwei'));
    });
}