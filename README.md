> [asciinema.player.asciicast][source] as npm module

# load-asciicast

* Normalize asciicast formats `v0`, `v1`, `v2`
* Initialize frames into a asciinema `Screen`
* Uses the same abstractions as asciinema-player

## Install

```
npm install load-asciicast
```

## Usage

```js
import fs from 'fs';
import {promisify} from 'util';
import {load} from 'load-asciicast';

const read = promisify(fs.readFile);

(async () => {
  const data = String(await read('asciicast.json'));

  // Optional;
  // if width, height, and idle are not specified, they will be taken from data
  const options = {
    width: 80,  // Screencast width
    height: 25, // Screencast height
    idle: 2.5,  // Idle time limit in seconds
    fps: 30     // Frames per second limit, see https://github.com/marionebl/svg-term/issues/13
  };

  const asciicast = await load(data, options);
  // => {...}
})();
```

## Development

**Prerequisites**

* Java 8
* Node 8
* leiningen

```sh
git clone https://github.com/marionebl/load-asciicast.git
cd load-asciicast
git submodule update --init --recursive # init asciinema-player, vt
lein cljsbuild auto

# Other terminal window
npm install
npm start
```

[source]: https://github.com/asciinema/asciinema-player
