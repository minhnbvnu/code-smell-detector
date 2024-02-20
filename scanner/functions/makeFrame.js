function makeFrame(points, colors) {
  return {
    update_type: 'snapshot',
    updates: [
      {
        timestamp: 1.0,
        poses: {
          [PRIMARY_POSE_STREAM]: DEFAULT_POSE
        },
        primitives: {
          '/test/points': {
            points: [
              {
                base: {
                  object_id: '1'
                },
                points,
                colors
              }
            ]
          }
        }
      }
    ]
  };
}