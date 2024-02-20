function createCopyCodePreview() {
  return {
    install(VMdEditor) {
      if (!VMdEditor.mixins) VMdEditor.mixins = [];

      VMdEditor.mixins.push({
        mounted() {
          this.$nextTick(() => {
            const previewEl = getPreviewEl(this.$el);

            previewEl.addEventListener('click', this.handleCopyCodeClick);
          });
        },
        beforeDestroy() {
          const previewEl = getPreviewEl(this.$el);

          previewEl.removeEventListener('click', this.handleCopyCodeClick);
        },
        methods: {
          handleCopyCodeClick({ target }) {
            if (isCopyButton(target)) {
              const codeWrapper = findCodeWrapperEl(target.parentNode);

              if (codeWrapper) {
                const code = codeWrapper.querySelector('code').innerText;

                copyToClipboard(code);
                this.$emit('copy-code-success', code);
              }
            }
          },
        },
      });
    },
  };
}