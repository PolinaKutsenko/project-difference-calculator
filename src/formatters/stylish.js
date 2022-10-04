import _ from 'lodash';

const getIndent = (spaces) => '  '.repeat(spaces);

const stringify = (data, depthTree) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const beginIndent = getIndent(2 * depthTree + 2);
  const endIndent = getIndent(2 * depthTree);
  const keys = _.keys(data);
  const result = keys.map((key) => `${beginIndent}${key}: ${stringify(data[key], depthTree + 1)}`);
  return ['{', ...result, `${endIndent}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (diff, depth) => {
    const beginIndent = getIndent(2 * depth - 1);
    const endIndent = getIndent(2 * depth - 2);
    const result = diff.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${beginIndent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'changed': {
          const value1 = `${beginIndent}- ${obj.key}: ${stringify(obj.value1, depth)}`;
          const value2 = `${beginIndent}+ ${obj.key}: ${stringify(obj.value2, depth)}`;
          return [value1, value2].join('\n');
        }
        case 'added':
          return `${beginIndent}+ ${obj.key}: ${stringify(obj.value, depth)}`;
        case 'deleted':
          return `${beginIndent}- ${obj.key}: ${stringify(obj.value, depth)}`;
        default:
          return `${beginIndent}  ${obj.key}: ${stringify(obj.value, depth)}`;
      }
    });
    return ['{', ...result, `${endIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
