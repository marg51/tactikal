import {createIndexedMap, getPositionForPlayerAfterMove} from "../utils/map"

const INIT_STATE:GAME = {
    players: [],
    positions: {},
    map: [],
    time: 0,
    index: {via_x: {}, via_y: {}}
}

export default (state = {...INIT_STATE}, action: ACTION): GAME => {

    console.log(action.type)

    switch(action.type) {
        case "GAME:INIT":
            return {
                map: action.map,
                players: action.players,
                positions: action.positions,
                index: createIndexedMap(action.map),
                time: 0
            }
        case "GAME:SELECT_POSITION":
            return {
                ...state,
                players: state.players.map(player => {
                    if(player.id == action.player.id) {
                        return {
                            ...player,
                            coords: action.coords
                        }
                    }

                    return player
                })
            }
        case "GAME:MOVE":
            const positions = getPositionForPlayerAfterMove(state, action.player, action.direction)
            console.log(positions)
            return {
                ...state,
                positions: {
                    ...state.positions,
                    [action.player.id]: positions
                }
            }
    }

    return state
}