export function isMobileBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/ipad|iphone|ipod|android|iemobile/) && !window.MSStream;
}

export function hasLocalStorage() {
  const test = 'test';

  try {
    localStorage.setItem(test, test);
    return localStorage.getItem(test) === test;
  } catch(e) {
    return false;
  }
}
