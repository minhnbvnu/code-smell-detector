function alertVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert(
            {
              title: 'Title',
              content: 'This is an alert message.',
            },
            (msg) => {
              // callback after modal dismissed
              this.$notify(`You selected ${msg}.`);
            }
          );
        },
      },
    }
  );
}