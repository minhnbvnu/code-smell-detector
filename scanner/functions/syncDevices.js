function syncDevices() {
      const devices = {};
      sub = command("listenDevices")().subscribe(
        ({ device, deviceModel, type, descriptor }) => {
          if (device) {
            const deviceId = descriptor || "";
            const stateDevice = {
              deviceId,
              modelId: deviceModel ? deviceModel.id : "nanoS",
              wired: true,
            };

            if (type === "add") {
              devices[deviceId] = true;
              dispatch(addDevice(stateDevice));
            } else if (type === "remove") {
              delete devices[deviceId];
              dispatch(removeDevice(stateDevice));
            }
          }
        },
        () => {
          resetDevices();
          syncDevices();
        },
        () => {
          resetDevices();
          syncDevices();
        },
      );
    }