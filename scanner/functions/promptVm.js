function promptVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a prompt modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$prompt({
            title: 'Welcome',
            content: 'Please input your email:',
            // A simple input validator
            // returns the err msg (not valid) or null (valid)
            validator(value) {
              return /\S+@\S+\.\S+/.test(value)
                ? null
                : 'Email address is not valid!';
            },
          })
            .then((value) => {
              this.$notify({
                type: 'success',
                content: `You email address is ${value}`,
              });
            })
            .catch(() => {
              this.$notify('Input canceled.');
            });
        },
      },
    }
  );
}