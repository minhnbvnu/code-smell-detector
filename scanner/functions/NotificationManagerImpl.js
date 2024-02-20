function NotificationManagerImpl (editor, extras, uiMothership) {
      var backstage = extras.backstage;
      var getLayoutDirection = function (rel) {
        switch (rel) {
        case 'bc-bc':
          return south$3;
        case 'tc-tc':
          return north$3;
        case 'tc-bc':
          return north$1;
        case 'bc-tc':
        default:
          return south$1;
        }
      };
      var prePositionNotifications = function (notifications) {
        each(notifications, function (notification) {
          return notification.moveTo(0, 0);
        });
      };
      var positionNotifications = function (notifications) {
        if (notifications.length > 0) {
          head(notifications).each(function (firstItem) {
            return firstItem.moveRel(null, 'banner');
          });
          each(notifications, function (notification, index) {
            if (index > 0) {
              notification.moveRel(notifications[index - 1].getEl(), 'bc-tc');
            }
          });
        }
      };
      var reposition = function (notifications) {
        prePositionNotifications(notifications);
        positionNotifications(notifications);
      };
      var open = function (settings, closeCallback) {
        var hideCloseButton = !settings.closeButton && settings.timeout && (settings.timeout > 0 || settings.timeout < 0);
        var close = function () {
          closeCallback();
          InlineView.hide(notificationWrapper);
        };
        var notification = build$1(Notification.sketch({
          text: settings.text,
          level: contains([
            'success',
            'error',
            'warning',
            'warn',
            'info'
          ], settings.type) ? settings.type : undefined,
          progress: settings.progressBar === true,
          icon: Option.from(settings.icon),
          closeButton: !hideCloseButton,
          onAction: close,
          iconProvider: backstage.shared.providers.icons,
          translationProvider: backstage.shared.providers.translate
        }));
        var notificationWrapper = build$1(InlineView.sketch(__assign({
          dom: {
            tag: 'div',
            classes: ['tox-notifications-container']
          },
          lazySink: extras.backstage.shared.getSink,
          fireDismissalEventInstead: {}
        }, backstage.shared.header.isPositionedAtTop() ? {} : { fireRepositionEventInstead: {} })));
        uiMothership.add(notificationWrapper);
        if (settings.timeout > 0) {
          global$2.setTimeout(function () {
            close();
          }, settings.timeout);
        }
        return {
          close: close,
          moveTo: function (x, y) {
            InlineView.showAt(notificationWrapper, {
              anchor: 'makeshift',
              x: x,
              y: y
            }, premade$1(notification));
          },
          moveRel: function (element, rel) {
            if (rel !== 'banner') {
              var layoutDirection_1 = getLayoutDirection(rel);
              var nodeAnchor = {
                anchor: 'node',
                root: body(),
                node: Option.some(Element.fromDom(element)),
                layouts: {
                  onRtl: function () {
                    return [layoutDirection_1];
                  },
                  onLtr: function () {
                    return [layoutDirection_1];
                  }
                }
              };
              InlineView.showAt(notificationWrapper, nodeAnchor, premade$1(notification));
            } else {
              InlineView.showAt(notificationWrapper, extras.backstage.shared.anchors.banner(), premade$1(notification));
            }
          },
          text: function (nuText) {
            Notification.updateText(notification, nuText);
          },
          settings: settings,
          getEl: function () {
            return notification.element().dom();
          },
          progressBar: {
            value: function (percent) {
              Notification.updateProgress(notification, percent);
            }
          }
        };
      };
      var close = function (notification) {
        notification.close();
      };
      var getArgs = function (notification) {
        return notification.settings;
      };
      return {
        open: open,
        close: close,
        reposition: reposition,
        getArgs: getArgs
      };
    }