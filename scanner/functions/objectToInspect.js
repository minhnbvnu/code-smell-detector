function objectToInspect() {
  return objectFactory({
    name: 'My Object',
    objectId: 'objectId',
    errors: [],
    details: [
      {
        name: 'First Detail',
        expand: false,
        properties: [
          {
            name: 'numberProperty',
            value: {
              inspect: 1,
              value: 'type-number',
            },
          },
        ],
      },
      {
        name: 'Second Detail',
        properties: [
          {
            name: 'objectProperty',
            value: {
              inspect: 'Ember Object Name',
              type: 'type-ember-object',
            },
          },
          {
            name: 'stringProperty',
            value: {
              inspect: 'String Value',
              type: 'type-ember-string',
            },
          },
        ],
      },
      {
        name: 'Third Detail',
        properties: [
          {
            name: 'property.with.dot',
            value: {
              inspect: 'String Value',
              type: 'type-ember-string',
            },
          },
        ],
      },
    ],
  });
}