import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(buildFullPath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const data1 = parse(content1, getFormat(filepath1));
  const data2 = parse(content2, getFormat(filepath2));

  const buildDiffTree = buildDiff(data1, data2);
  return format(buildDiffTree, formatName);
};

export default genDiff;
