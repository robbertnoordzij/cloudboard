export function isInLocalMode() {
  return window.location.pathname.indexOf('/local') === 0;
}
