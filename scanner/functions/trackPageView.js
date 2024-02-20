function trackPageView(newUrl) {
  if (!window.gtag) {
    return;
  }
  window.gtag('config', GA_CODE, {
    path_url: newUrl,
  });
}