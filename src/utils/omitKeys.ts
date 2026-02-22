export function omitKeys<T extends Record<string, unknown>>(
  obj: T | undefined,
  keysToRemove: string[] | undefined
): T | undefined {
  if (!obj) {
    return obj;
  }
  if (!keysToRemove?.length) {
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
  ) as T;
}
