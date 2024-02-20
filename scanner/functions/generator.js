function generator(state = initialState, action) {
  switch (action.type) {
    case GRID_ITEM_SELECTED:
      return extend({}, state, {
        actualFormType: 'cwd',
        questions: [{
          message: 'Please specify a folder to be used to generate the project',
          name: 'cwd',
          type: 'folder'
        }],
        selectedGenerator: action.generator
      });
    case GENERATOR_PROMPT_QUESTIONS:
      return extend({}, state, {
        actualFormType: 'prompt',
        questions: action.questions
      });
    case GENERATOR_INSTALL:
      return extend({}, state, {
        isLoading: true,
        actualFormType: '',
        questions: []
      });
    case GENERATOR_DONE:
      return extend({}, state, {
        isLoading: false,
        selectedGenerator: {}
      });
    case GENERATOR_INSTALLED_GENERATORS:
      return extend({}, state, {
        generators: action.generators
      });
    default:
      return state;
  }
}