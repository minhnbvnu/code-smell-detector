function warnAboutHitTest (e) {
  console.warn(e.message);
  console.warn('Cannot requestHitTestSource Are you missing: webxr="optionalFeatures: hit-test;" from <a-scene>?');
}