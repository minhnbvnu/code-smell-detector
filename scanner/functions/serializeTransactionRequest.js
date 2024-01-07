function serializeTransactionRequest(type, features, objectStack, request) {
  pushSerializeAndPop(
    request,
    TRANSACTION_SERIALIZERS,
    makeSimpleNodeFactory(type),
    features,
    objectStack,
  );
}