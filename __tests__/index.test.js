import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff_plain', () => {
  const result = readFile('result_plain.txt');
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result);
});

test('genDiff_json', () => {
  const result = readFile('result_json.txt');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(result);
});

test('genDiff_stylish', () => {
  const result = readFile('result_stylish.txt');
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
