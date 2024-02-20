async function handleMdChange() {
    if (typeof window === 'undefined') return;

    await this.$nextTick();

    const previewEl = getPreviewEl(this.$el);
    const eles = previewEl.querySelectorAll('.v-md-mermaid');

    if (!eles.length || this.isEditMode) return;

    let parseSuccess = false;
    eles.forEach((ele) => {
      try {
        parseSuccess = mermaid.parse(ele.innerText);
      } catch (e) {
        if (!e.str) {
          console.log(e);
        }
      }

      if (parseSuccess) mermaid.init(null, ele);
    });
  }