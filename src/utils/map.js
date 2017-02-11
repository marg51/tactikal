"use strict";
require("colors");
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["up"] = 0] = "up";
    DIRECTION[DIRECTION["down"] = 1] = "down";
    DIRECTION[DIRECTION["left"] = 2] = "left";
    DIRECTION[DIRECTION["right"] = 3] = "right";
})(DIRECTION || (DIRECTION = {}));
function getPositionForPlayer(state, player) {
    return state.positions[player.id];
}
exports.getPositionForPlayer = getPositionForPlayer;
function getPositionForPlayerAfterMove(state, player, direction) {
    const position = getPositionForPlayer(state, player);
    const vector = { x: 0, y: 0 };
    if (direction == DIRECTION.left)
        vector.y = -1;
    else if (direction == DIRECTION.right)
        vector.y = 1;
    else if (direction == DIRECTION.up)
        vector.x = -1;
    else if (direction == DIRECTION.down)
        vector.x = 1;
    return { x: position.x + vector.x, y: position.y + vector.y };
}
exports.getPositionForPlayerAfterMove = getPositionForPlayerAfterMove;
function getPlayerOnCoords(game, coords) {
    return Object.keys(game.positions).reduce((foundPlayer, currentId) => {
        if (game.positions[currentId].x == coords.x && game.positions[currentId].y == coords.y)
            return currentId;
        return parseInt(foundPlayer);
    }, null);
}
exports.getPlayerOnCoords = getPlayerOnCoords;
function getCeilAtPosition(state, position) {
    return state.index.via_x[position.x][position.y];
}
exports.getCeilAtPosition = getCeilAtPosition;
function createIndexedMap(map) {
    const via_x = {};
    const via_y = {};
    map.map(ceil => {
        addElement(via_x, ceil.coords.x, ceil.coords.y, ceil);
        addElement(via_y, ceil.coords.y, ceil.coords.x, ceil);
    });
    return {
        via_x,
        via_y
    };
    function addElement(container, coord1, coord2, ceil) {
        if (!container[coord1]) {
            container[coord1] = {};
        }
        container[coord1][coord2] = ceil;
    }
}
exports.createIndexedMap = createIndexedMap;
function renderMap(game) {
    const cursors = {
        [game.players[0].id]: "•",
        [game.players[1].id]: "◊",
    };
    const colors = {
        [game.players[0].id]: "red",
        [game.players[1].id]: "green",
        "null": "gray"
    };
    Object.keys(game.index.via_x).map(x => {
        console.log(Object.keys(game.index.via_x[x]).map(y => {
            const ceil = game.index.via_x[x][y];
            const playerId = getPlayerOnCoords(game, ceil.coords);
            return ceil.type == "kingdom" ? "‡"[colors[playerId]] : playerId ? cursors[playerId][colors[playerId]] : " ";
        }).join("|"));
    });
}
exports.renderMap = renderMap;
function createMap(width, height, params) {
    const map = [];
    const static_map = {
        "2-2": {
            player: 0,
            type: "kingdom",
            coords: {
                x: 2,
                y: 2
            }
        },
        "4-4": {
            type: "tower",
            value: 10,
            coords: {
                x: 4,
                y: 4
            }
        },
        "11-11": {
            type: "tower",
            value: 10,
            coords: {
                x: 11,
                y: 11
            }
        },
        "12-12": {
            player: 1,
            type: "kingdom",
            coords: {
                x: 12,
                y: 12
            }
        }
    };
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (static_map[`${i}-${j}`])
                map.push(static_map[`${i}-${j}`]);
            else
                map.push({ type: "empty", value: 0, coords: { x: i, y: j } });
        }
    }
    return map;
}
exports.createMap = createMap;
