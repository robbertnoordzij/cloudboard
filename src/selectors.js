export function getCollapsedCollections({ collections }) {
  return collections
    .filter(collection => collection.collapsed)
    .map(collection => collection.name);
}

export function isInLocalMode() {
  return window.location.pathname.indexOf('/local') === 0;
}
