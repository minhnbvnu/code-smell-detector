function documentReady() {
  const rs = document.readyState;
  if (rs === 'interactive' || rs === 'completed') {
    return Promise.resolve();
  }

  return new Promise(
    resolve => document.addEventListener(
      'readystatechange', resolve, { once: true }
    )
  );
}