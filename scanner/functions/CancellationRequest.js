function CancellationRequest(shopify) {
  this.shopify = shopify;

  this.parentName = 'fulfillment_orders';
  this.key = this.name = 'cancellation_request';
}