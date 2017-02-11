"use strict";
const mapHelpers = require("../utils/map");
function canMove(state, player, direction) {
    // const currentPosition = mapHelpers.getPositionForPlayer(state, player)
    // const currentCeil = mapHelpers.getCeilAtPosition(state, currentPosition)
    const targetPosition = mapHelpers.getPositionForPlayerAfterMove(state, player, direction);
    const targetCeil = mapHelpers.getCeilAtPosition(state, targetPosition);
    if (targetCeil.type === "empty" || targetCeil.type === "kingdom" || targetCeil.type === "tower")
        return true;
    return false;
}
exports.canMove = canMove;
function doMove(state, player, direction) {
    const position_previousceil = mapHelpers.getPositionForPlayer(state, player);
    const position_newceil = mapHelpers.getPositionForPlayerAfterMove(state, player, direction);
    const setPosition = {
        type: "GAME:SELECT_POSITION",
        coords: mapHelpers.getPositionForPlayerAfterMove(state, player, direction),
        player: player
    };
    const previous_ceil = mapHelpers.getCeilAtPosition(state, position_previousceil);
    const current_ceil = mapHelpers.getCeilAtPosition(state, position_newceil);
    let current_value = current_ceil.value;
    if (current_ceil.player.id != player.id) {
        current_value = -current_value;
    }
    const updateNewCeil = {
        type: "CEIL:UPDATE",
        ceil: current_ceil,
        player,
        value: current_value + previous_ceil.value
    };
    const updatePreviousCeil = {
        type: "CEIL:UPDATE",
        player,
        ceil: previous_ceil,
        value: 1
    };
    return [setPosition, updateNewCeil, updatePreviousCeil];
}
exports.doMove = doMove;
