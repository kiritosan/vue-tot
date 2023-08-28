export function localGet(key) {
  return localStorage.getItem(key);
}

export function localSet(key, value) {
  return localStorage.setItem(key, value);
}
