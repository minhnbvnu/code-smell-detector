function positionItem(ele, itemType) {
      if (!ele) return;

      if (itemType === 'title') {
        // title element
        titleEle.append(ele);

      } else if (itemType == 'rightButtons' ||
                (itemType == SECONDARY_BUTTONS && $ionicConfig.navBar.positionSecondaryButtons() != 'left') ||
                (itemType == PRIMARY_BUTTONS && $ionicConfig.navBar.positionPrimaryButtons() == 'right')) {
        // right side
        if (!rightButtonsEle) {
          rightButtonsEle = jqLite('<div class="buttons buttons-right">');
          headerBarEle.append(rightButtonsEle);
        }
        if (itemType == SECONDARY_BUTTONS) {
          rightButtonsEle.append(ele);
        } else {
          rightButtonsEle.prepend(ele);
        }

      } else {
        // left side
        if (!leftButtonsEle) {
          leftButtonsEle = jqLite('<div class="buttons buttons-left">');
          if (navEle[BACK_BUTTON]) {
            navEle[BACK_BUTTON].after(leftButtonsEle);
          } else {
            headerBarEle.prepend(leftButtonsEle);
          }
        }
        if (itemType == SECONDARY_BUTTONS) {
          leftButtonsEle.append(ele);
        } else {
          leftButtonsEle.prepend(ele);
        }
      }

    }