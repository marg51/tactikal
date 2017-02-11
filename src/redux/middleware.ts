import {canMove} from "../rules/moves"
import * as mapHelpers from "../utils/map"

export default store => next => (action:ACTION) => {

    if(typeof action == "function") {
        action = action(store.dispatch, store.getState)
    }

    if(action.type == "GAME:MOVE") {
        if(!canMove(store.getState(), action.player, action.direction)) {
            console.log("[rule]: can't move", action)
            return
        }
    }
    if(action.type == "GAME:SELECT_POSITION") {
        if(mapHelpers.getPlayerOnCoords(store.getState(), action.coords) != action.player.id) {
            console.log("[rule]: can't select", action)
            return
        }
    }

    next(action)
}