"use strict";
const moves_1 = require("../rules/moves");
function selectPosition(player, coords) {
    return {
        type: "GAME:SELECT_POSITION",
        player,
        coords
    };
}
exports.selectPosition = selectPosition;
function move(player, direction) {
    return (dispatch, getState) => {
        moves_1.doMove(getState(), player, direction).map(dispatch);
    };
}
exports.move = move;
function initGame(players, map, positions) {
    return {
        type: "GAME:INIT",
        players,
        positions,
        map
    };
}
exports.initGame = initGame;
