function topFrameUrlIsFacebookApps(frameAncestorsArray) {
  if (!frameAncestorsArray || frameAncestorsArray.length === 0) {
    // No frame ancestor return false
    return false;
  }

  const appsFacebookURL = "https://apps.facebook.com";
  const frameAncestorsURL = frameAncestorsArray[0].url;

  if (!frameAncestorsURL.startsWith(appsFacebookURL)) {
    // Only allow frame ancestors that originate from apps.facebook.com
    return false;
  }

  return frameAncestorsURL;
}