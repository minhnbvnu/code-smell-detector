function createCarousel(carousel, sender) {
  return Map({
    type: MESSAGES_TYPES.CAROUSEL,
    component: Carousel,
    sender,
    elements: fromJS(carousel.attachment.payload.elements),
    timestamp: new Date().getTime()
  });
}