function routeTree() {
  return {
    value: routeValue('application'),
    children: [
      {
        value: routeValue('post', { controller: { exists: false } }),
        children: [
          {
            value: routeValue('post.loading', { url: 'post/loading' }),
            children: [],
          },
          {
            value: routeValue('post.new', { url: 'post/new' }),
            children: [],
          },
          {
            value: routeValue('post.edit', { url: 'post/edit' }),
            children: [
              {
                value: routeValue('comments', { url: 'post/edit/comments' }),
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
}