function handleClickOutside(event) {
        const outsideOfTarket =
          ref.current && !ref.current.contains(event.target);
        const outsideOfTrigger = elem && !elem.contains(event.target);
        if (outsideOfTarket && (elem ? outsideOfTrigger : true)) {
          action();
        }
      }