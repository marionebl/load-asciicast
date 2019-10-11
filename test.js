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

test('inits with idle option', async t => {
  const idle = 0.5;
  const data = await fixture('v2.json');
  const actual = await load(data, {idle});

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 1.5);
  t.is(actual.frames.length, 3);
});

test('inits with fps option', async t => {
  const fps = 0.1;
  const data = await fixture('v2.json');
  const actual = await load(data, {fps});

  t.is(actual.width, 80);
  t.is(actual.height, 24);
  t.is(actual.duration, 3);
  t.is(actual.frames.length, 1);

  // [[102,{}], [111,{}], ...]
  const actualLine = actual.frames[0][1].screen.lines[0];

  // See v2.json, the frames should be merged because we've specified very low fps
  const line = 'foobar';
  const chars = Array.from(line);
  const codes = chars.map(c => c.charCodeAt(0));
  codes.forEach((c, i) => t.is(actualLine[i][0], c));

  // With higher fps, the frames should be separated
  const actual10 = await load(data, {fps: 10});
  t.is(actual10.frames.length, 3);
});
