import * as mapHelpers from "../utils/map"

export function canMove(state:GAME, player:PLAYER, direction:DIRECTION): boolean {
    // const currentPosition = mapHelpers.getPositionForPlayer(state, player)
    // const currentCeil = mapHelpers.getCeilAtPosition(state, currentPosition)

    const targetPosition = mapHelpers.getPositionForPlayerAfterMove(state, player, direction)
    const targetCeil = mapHelpers.getCeilAtPosition(state, targetPosition)

    if(targetCeil.type === "empty" || targetCeil.type === "kingdom" || targetCeil.type === "tower")
        return true
    return false
}

export function doMove(state:GAME, player:PLAYER, direction:DIRECTION):ACTION[] {
    const position_previousceil = mapHelpers.getPositionForPlayer(state, player)
    const position_newceil = mapHelpers.getPositionForPlayerAfterMove(state, player, direction)

    const setPosition:$SELECT_POSITION = {
        type: "GAME:SELECT_POSITION",
        coords: mapHelpers.getPositionForPlayerAfterMove(state, player, direction),
        player: player
    }

    const previous_ceil = mapHelpers.getCeilAtPosition(state, position_previousceil)
    const current_ceil = mapHelpers.getCeilAtPosition(state, position_newceil)

    let current_value = current_ceil.value
    if(current_ceil.player.id != player.id) {
        current_value = -current_value
    }

    const updateNewCeil:$UPDATE_CEIL = {
        type: "CEIL:UPDATE",
        ceil: current_ceil,
        player,
        value: current_value + previous_ceil.value
    }

    const updatePreviousCeil:$UPDATE_CEIL = {
        type: "CEIL:UPDATE",
        player,
        ceil: previous_ceil,
        value: 1
    }

    return [setPosition, updateNewCeil, updatePreviousCeil]
}

