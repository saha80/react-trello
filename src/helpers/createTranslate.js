const get = (/** @type {object} */ obj, /** @type {string} */ path) =>
  path.split('.').reduce((value, currentPath) => value[currentPath], obj);

const createTranslate = (TABLE) => (key) => get(TABLE, key);

export default createTranslate;
