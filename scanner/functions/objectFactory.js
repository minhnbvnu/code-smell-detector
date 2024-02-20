function objectFactory(props) {
  return {
    name: 'Object Name',
    objectId: 1,
    errors: [],
    details: [
      {
        name: 'Own Properties',
        expand: true,
        properties: [
          {
            name: 'id',
            value: 1,
          },
        ],
      },
    ],
    ...props,
  };
}