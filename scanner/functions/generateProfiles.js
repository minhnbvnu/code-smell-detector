function generateProfiles() {
  return [
    {
      name: 'First View Rendering',
      duration: 476.87,
      timestamp: new Date(2014, 5, 1, 13, 16, 22, 715).getTime(),
      children: [
        {
          name: 'Child view',
          duration: 0.36,
          timestamp: new Date(2014, 5, 1, 13, 16, 22, 581).getTime(),
          children: [],
        },
      ],
    },

    {
      name: 'Second View Rendering',
      duration: 10,
      timestamp: new Date(2014, 5, 1, 13, 16, 22, 759).getTime(),
      children: [],
    },
  ];
}