import {getPositionForPlayerAfterMove} from "../utils/map"
import {doMove} from "../rules/moves"


export function selectPosition(player:PLAYER, coords: COORDS):$SELECT_POSITION {
    return {
        type: "GAME:SELECT_POSITION",
        player,
        coords
    }
}

export function move(player:PLAYER, direction: DIRECTION) {
    return (dispatch, getState) => {
        doMove(getState(), player, direction).map(dispatch)
    }
}

export function initGame(players:PLAYER[], map:MAP, positions:PLAYER_POSITIONS):$INIT_ACTION {
    return {
        type: "GAME:INIT",
        players,
        positions,
        map
    }
}
