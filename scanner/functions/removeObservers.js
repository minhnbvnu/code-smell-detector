function removeObservers(propertyKey) {
      removeBeforeObserver(item, propertyKey, this, observerContexts[sliceIndex].beforeObserver);
      removeObserver(item, propertyKey, this, observerContexts[sliceIndex].observer);
    }