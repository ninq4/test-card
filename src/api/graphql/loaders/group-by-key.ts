export function groupByKey<T>(
  keys: readonly string[],
  items: readonly T[],
  getKey: (item: T) => string,
): T[][] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);

    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return keys.map((key) => groups.get(key) ?? []);
}
