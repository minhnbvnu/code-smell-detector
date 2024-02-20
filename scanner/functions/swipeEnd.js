function swipeEnd(coords, event, forceAnimation) {
                            //  console.log('swipeEnd', 'scope.carouselIndex', scope.carouselIndex);
                            // Prevent clicks on buttons inside slider to trigger "swipeEnd" event on touchend/mouseup
                            // console.log(iAttributes.rnCarouselOnInfiniteScroll);
                            if (event && !swipeMoved) {
                                return;
                            }
                            unbindMouseUpEvent();
                            pressed = false;
                            swipeMoved = false;
                            destination = startX - coords.x;
                            if (destination===0) {
                                return;
                            }
                            if (locked) {
                                return;
                            }
                            offset += (-destination * 100 / elWidth);
                            if (options.isSequential) {
                                var minMove = options.moveTreshold * elWidth,
                                    absMove = -destination,
                                    slidesMove = -Math[absMove >= 0 ? 'ceil' : 'floor'](absMove / elWidth),
                                    shouldMove = Math.abs(absMove) > minMove;

                                if (currentSlides && (slidesMove + scope.carouselIndex) >= currentSlides.length) {
                                    slidesMove = currentSlides.length - 1 - scope.carouselIndex;
                                }
                                if ((slidesMove + scope.carouselIndex) < 0) {
                                    slidesMove = -scope.carouselIndex;
                                }
                                var moveOffset = shouldMove ? slidesMove : 0;

                                destination = (scope.carouselIndex + moveOffset);

                                goToSlide(destination);
                                if(iAttributes.rnCarouselOnInfiniteScrollRight!==undefined && slidesMove === 0 && scope.carouselIndex !== 0) {
                                    $parse(iAttributes.rnCarouselOnInfiniteScrollRight)(scope)
                                    goToSlide(0);
                                }
                                if(iAttributes.rnCarouselOnInfiniteScrollLeft!==undefined && slidesMove === 0 && scope.carouselIndex === 0 && moveOffset === 0) {
                                    $parse(iAttributes.rnCarouselOnInfiniteScrollLeft)(scope)
                                    goToSlide(currentSlides.length);
                                }

                            } else {
                                scope.$apply(function() {
                                    scope.carouselIndex = parseInt(-offset / 100, 10);
                                    updateBufferIndex();
                                });

                            }

                        }