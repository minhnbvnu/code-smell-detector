function getOwner(application) {
  if (application.autoboot) {
    return application.__deprecatedInstance__;
  } else if (application._applicationInstances /* Ember 3.1+ */) {
    return [...application._applicationInstances][0];
  }
}