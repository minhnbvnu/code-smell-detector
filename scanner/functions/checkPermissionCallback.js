function checkPermissionCallback(status) {
          if (!status.checkPermission) {
            NVR.log("No permission to post notifications");
          }
          permissions.requestPermission(permissions.POST_NOTIFICATIONS, succ, err);
        }