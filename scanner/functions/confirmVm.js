function confirmVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'This item will be permanently deleted. Continue?',
          })
            .then(() => {
              this.$notify({
                type: 'success',
                content: 'Delete completed.',
              });
            })
            .catch(() => {
              this.$notify('Delete canceled.');
            });
        },
      },
    }
  );
}