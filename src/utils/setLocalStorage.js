export const setItemLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
