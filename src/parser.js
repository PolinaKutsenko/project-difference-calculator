const getFormat = (obj, format) => {
  switch (format) {
    case 'json': return JSON.parse(obj);
    default: return '!';
  }
};

export default getFormat;
