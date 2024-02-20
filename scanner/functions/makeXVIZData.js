function makeXVIZData(start, end) {
  const metadata = {
    type: 'xviz/metadata',
    data: {
      version: '2.0.0',
      log_info: {
        start_time: start,
        end_time: end
      },
      streams: {
        ['/vehicle_pose']: {},
        ['/test/stream1']: {}
      }
    }
  };

  const messages = [];
  for (let i = start; i <= end; i++) {
    messages.push({
      type: 'xviz/state_update',
      data: {
        update_type: 'snapshot',
        updates: [
          {
            timestamp: i,

            poses: {
              '/vehicle_pose': {
                timestamp: start,
                orientation: [0, 0, 0],
                position: [0, 0, 0]
              }
            },
            primitives: {
              ['/circle']: {
                circles: [
                  {
                    center: [0.0, 0.0, 0.0],
                    radius: 5 + i
                  }
                ]
              }
            }
          }
        ]
      }
    });
  }

  return {metadata, messages};
}