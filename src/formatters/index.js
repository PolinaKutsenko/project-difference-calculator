import stylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return getJSON(tree);
    default:
      throw new Error('The format name is not stylish or plain or json');
  }
};

export default format;
