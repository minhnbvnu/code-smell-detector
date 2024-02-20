function getModelTypes() {
  return [
    {
      name: 'App.Post',
      count: 2,
      columns: [
        { name: 'id', desc: 'Id' },
        { name: 'title', desc: 'Title' },
        { name: 'body', desc: 'Body' },
      ],
      objectId: 'post-type',
    },
    {
      name: 'App.Comment',
      count: 1,
      columns: [
        { name: 'id', desc: 'Id' },
        { name: 'title', desc: 'Title' },
        { name: 'content', desc: 'Content' },
      ],
      objectId: 'comment-type',
    },
  ];
}