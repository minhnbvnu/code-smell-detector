function dynamicVm(data = {}) {
  return createWrapper(
    `<section>
    <tabs v-model="index">
      <tab v-for="tab in tabs" :title="tab" :key="tab">
        <p>Dynamic {{tab}}</p>
        <btn type="danger" @click="close">Close this tab</btn>
      </tab>
      <template #nav-right>
        <btn size="sm" @click="push">
          <i class="glyphicon glyphicon-plus"></i> Add
        </btn>
      </template>
    </tabs>
  </section>`,
    {
      tabs: ['Tab 1'],
      count: 1,
      index: 0,
      ...data,
    },
    {
      methods: {
        push() {
          this.tabs.push(`Tab ${++this.count}`);
          // open the new tab after created
          this.$nextTick(() => {
            this.index = this.tabs.length - 1;
          });
        },
        close() {
          this.tabs.splice(this.index, 1);
          if (this.index > 0) {
            --this.index;
          }
        },
      },
    }
  );
}