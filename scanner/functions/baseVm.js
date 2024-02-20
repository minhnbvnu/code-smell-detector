function baseVm() {
  return createWrapper(
    `
  <section>
    <btn @click="model=states[0]" type="primary">Set to Alabama</btn>
    <btn @click="model=null">Clear</btn>
    <hr/>
    <label for="input">States of America:</label>
    <input id="input" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input" :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `,
    {
      model: '',
      states: states.data,
    }
  );
}