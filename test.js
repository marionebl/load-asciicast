import test from 'ava';
import pkgDir from 'pkg-dir';
import * as sander from '@marionebl/sander';
import {load} from '.';

const fixture = async (name) => {
  return String(await sander.readFile(await pkgDir(__dirname), 'fixtures', name));
};

test('inits v0 string asciicast', async t => {
  const data = await fixture('v0.json');
  const actual = await load(data);

  t.is(actual.width, 6);
  t.is(actual.height, 2);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});

test.failing('inits v0 data asciicast', async t => {
  const data = JSON.parse(await fixture('v0.json'));
  const actual = await load(data);

  t.is(actual.width, 6);
  t.is(actual.height, 2);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});

test('inits v1 string asciicast', async t => {
  const data = await fixture('v1.json');
  const actual = await load(data);

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});

test.failing('inits v1 data asciicast', async t => {
  const data = JSON.parse(await fixture('v1.json'));
  const actual = await load(data);

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});

test('inits v2 string asciicast', async t => {
  const data = await fixture('v2.json');
  const actual = await load(data);

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});

test.failing('inits v2 data asciicast', async t => {
  const data = JSON.parse(await fixture('v2.json'));
  const actual = await load(data);

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 3);
});
