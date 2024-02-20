function groupSetData(context, cb) {
  if (canIUseGroupSetData()) {
    context.groupSetData(cb);
  } else {
    cb();
  }
}