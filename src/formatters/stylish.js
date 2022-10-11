import _ from 'lodash';

const getIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(spacesCount * (depth - 1));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const keys = _.keys(data);
  const result = keys.map((key) => `${getIndent(depth)}        ${key}: ${stringify(data[key], depth + 1)}`);
  return ['{', ...result, `${getIndent(depth)}    }`].join('\n');
};

const stylish = (tree) => {
  const iter = (diff, depth) => {
    const result = diff.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${getIndent(depth)}    ${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'changed': {
          const value1 = `${getIndent(depth)}  - ${obj.key}: ${stringify(obj.value1, depth)}`;
          const value2 = `${getIndent(depth)}  + ${obj.key}: ${stringify(obj.value2, depth)}`;
          return [value1, value2].join('\n');
        }
        case 'added':
          return `${getIndent(depth)}  + ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}  - ${obj.key}: ${stringify(obj.value, depth)}`;
        default:
          return `${getIndent(depth)}    ${obj.key}: ${stringify(obj.value, depth)}`;
      }
    });
    return ['{', ...result, `${getIndent(depth)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
