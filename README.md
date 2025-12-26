# nswengine

nswengine is a dumb-as-rocks engine for creating four-directional text-based games

i had a dream one night about making this engine, and then i made it

## building a game

you don't need any setup before starting to build your game, just download or clone this repository

currently all game content is defined directly in the `data.json` file in the root folder of the engine, which is a bit cumbersome, but yeah

i might make a GUI for creating games later idk, maybe it will have to come to me in another dream

for the game to run, you will have to define at least one room - room 0 - in the `data.json` file, like so:

```json
{
  "rooms": [
    {
      "id": 0,
      "textColor": "linen",
      "backgroundColor": "darkgoldenrod",
      "description": "last night i had a dream about coding a game engine",
      "north": {
        "label": "really?",
        "linkTo": 1
      }
    }
  ]
}
```

to break this down, `rooms` is just an array of objects, with each object being a room

every room must have

- an `id` - must be `0` for starting room, for other rooms this can be a number or a string, but must be unique (if two rooms have the same id, the game will always access the first room with that id)
- a `description` - string of text that will be displayed in the center of the room

every room can (but doesn't have to) have

- a `textColor` - this can be a html color name or a hex or rgb/ rgba value. if no color is provided text will display with default color
- a `backgroundColor` - this can be a html color name or a hex or rgb/ rgba value. if no color is provided background will display with default color

additionally, every room can have up to four exits, these must be `north`, `south`, `west` or `east`, or any combination of those. you cannot define two instances of the same exit for the same room (e.g. two `north` exits), and you cannot define any other exit (e.g. `north-west`)

every exit must have

- a `label` - text that will be displayed for that exit
- a `linkTo` - id of the room that the exit links to

if you do not include any exit in a room, the player will not be able to leave it, making that room an "end state" for your game

also, the starting room serves as the game's "title screen", the game does not have any state management outside switching between rooms

## ascii support

if you want to use ascii graphics in rooms, you can make the room `description` an array instead of a string

this way you can define ascii graphics, and the description will align horizontally to the left, based on the width of the first line

```json
{
  "id": 11,
  "font": "monospace",
  "textColor": "gainsboro",
  "backgroundColor": "darkolivegreen",
  "description": [
    "------------------------",
    "------    @         ----",
    "---                 ----",
    "--      (^._.^)~     ---",
    "---  @              ----",
    "--              @  -----",
    "---  <(o.o )>        ---",
    "--                ------",
    "---       @        -----",
    "--------      ----------",
    "------------------------"
  ],
  "north": {
    "label": "ascii?",
    "linkTo": 0
  }
}
```

you can use the optional `font` parameter to set the font to a monospace one

when adding ascii graphics mind that some characters, like the backslash `\` or quotation marks `"` will need to be escaped by putting a backslash in front `\`, otherwise json will get angry at you

so this won't work

```json
"description": [
    "----------------"-------",
  ],
```

but this will

```json
"description": [
    "----------------\"-------",
  ],
```

## playing the game

to play the game locally you need to open the `index.html` file with `Live Server`, or `http-server`, or some other similar solution.

the ES6 modules are not going to load if you just open the `index.html` file directly without a server.

if you upload it to whatever server online (itch/ github pages/ whatever else) it should run out of the box.

### uploading to itch

you can pack the entire folder with the `index.html` file and all the source into a `.zip` archive and upload it to itch, and the game should run nicely

## controls

the player controls movement between the rooms using either arrow keys (up down left right) or mouse / touch input

## common issues

> Q: i downloaded the source, but when i open the `index.html` file, the test game doesn't load

A: open the console in the same browser tab. if you see an error like `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource`, most likely you opened the `index.html` file directly. you need to run the game in localhost with a solution like [http-server](https://www.npmjs.com/package/http-server) or e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin if you use VS Code

> Q: i changed the content of `data.json` file and now the game refuses to load, i just see a blue screen

A: if you modified the `data.json` file, and the game just shows a blue screen, open the console in the same browser tab. if the console has a `SyntaxError: JSON.parse` error, this means you have a formatting issue in json. the error message should help you locate the exact issue

## modifying the engine

the bulk of the game logic is in the `source/nswengine.js` file. if for whatever reason you'd like to modify something that's probably a good place to start

## license

i am releasing the source code under MIT license (see `LICENSE` file) which is super liberal, provided that you retain the license file you can pretty much do whatever you want
