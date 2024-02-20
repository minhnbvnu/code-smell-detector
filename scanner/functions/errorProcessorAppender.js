function errorProcessorAppender(layout, timezoneOffset) {
  const filterChain = new FilterChain();
  return (loggingEvent) => {
    const message = layout(loggingEvent, timezoneOffset) + '\n';
    filterChain.process(message);
  };
}