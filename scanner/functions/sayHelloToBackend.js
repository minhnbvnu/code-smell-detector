function sayHelloToBackend() {
  window.postMessage({
    source: 'react-devtools-content-script',
    hello: true
  }, '*');
}