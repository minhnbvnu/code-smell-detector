function setProjectAnnotations(projectAnnotations) {
  var annotations = Array.isArray(projectAnnotations) ? projectAnnotations : [projectAnnotations];
  GLOBAL_STORYBOOK_PROJECT_ANNOTATIONS = Object(_composeConfigs__WEBPACK_IMPORTED_MODULE_15__[/* composeConfigs */ "a"])(annotations);
}