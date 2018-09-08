export function getCollapsedCollections({ collections }) {
  return collections
    .filter(collection => collection.collapsed)
    .map(collection => collection.name);
}
