import yaml from 'js-yaml';

const method = {
  json: JSON.parse,
  yaml: yaml.load,
};

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return method.json(data);
    case 'yml':
    case 'yaml':
      return method.yaml(data);
    default:
      throw new Error('The data format is not .json, .yml, .yaml');
  }
};

export default parse;
