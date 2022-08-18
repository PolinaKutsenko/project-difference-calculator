import _ from 'lodash';

const signed = (obj) => {
  switch (obj.status) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      return '  ';
  }
};

const stringify = (data, depthTree) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const replacer = ' '.repeat(4);
  const beginIndent = replacer.repeat(depthTree + 2);
  const endIndient = replacer.repeat(depthTree - 1);
  const keys = _.keys(data);
  const result = keys.map((key) => `${beginIndent}${key}: ${stringify(data[key], depthTree + 2)}`);
  return ['{', ...result, `${endIndient}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (diff, depth) => {
    const replacer = ' '.repeat(2);
    const beginIndent = replacer.repeat(depth);
    const endIndient = replacer.repeat(depth - 1);
    const result = diff.map((obj) => {
      if (obj.type === 'nested') {
        return `${beginIndent}${signed(obj)}${obj.key}: ${iter(obj.children, depth + 2)}`;
      }
      if (obj.status === 'changed') {
        return `${beginIndent}- ${obj.key}: ${stringify(obj.value[0], depth)}\n${beginIndent}+ ${obj.key}: ${stringify(obj.value[1], depth)}`;
      }
      return `${beginIndent}${signed(obj)}${obj.key}: ${stringify(obj.value, depth)}`;
    });
    return ['{', ...result, `${endIndient}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
