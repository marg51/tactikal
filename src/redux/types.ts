interface GAME {
    map: MAP
    players: PLAYER[]
    positions: PLAYER_POSITIONS
    time: number
    index: INDEX
}

type MAP = CEIL[]

interface COORDS {
    x: number
    y: number
}

type CEIL_TYPE = "land" | "tower" | "kingdom" | "empty"
interface CEIL {
    player?: PLAYER
    coords: COORDS
    type: CEIL_TYPE
    value: number
}

interface PLAYER {
    id: number
    name: string
}

interface OBSTACLE {
    type: "mountain"
}

enum DIRECTION {
    up, down, left, right
}

interface PLAYER_POSITIONS {
    [key:number]: COORDS
}

interface INDEX {
    via_x: INDEXED_MAP
    via_y: INDEXED_MAP
}

interface INDEXED_MAP {
    [key: number]: NESTED_INDEXED_MAP
}
type NESTED_INDEXED_MAP = {
    [key: number]: CEIL
}

// ###### Actions



type ACTION = $INIT_ACTION | $SELECT_POSITION | $MOVE | $UPDATE_CEIL

interface $INIT_ACTION {
    type: "GAME:INIT"
    players: PLAYER[]
    positions: PLAYER_POSITIONS
    map: MAP
}

interface $SELECT_POSITION {
    type: "GAME:SELECT_POSITION"
    player: PLAYER
    coords: COORDS
}

interface $MOVE {
    type: "GAME:MOVE"
    player: PLAYER
    direction: DIRECTION
}

interface $UPDATE_CEIL {
    type: "CEIL:UPDATE"
    player: PLAYER
    value: number
    ceil: CEIL
}