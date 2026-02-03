export const refreshPage = () => window.location.reload();

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): unknown => {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
};
