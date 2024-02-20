function DiscountCodeCreationJob(shopify) {
  this.shopify = shopify;

  this.parentName = 'price_rules';
  this.name = 'batch';
  this.key = 'discount_code_creation';
}