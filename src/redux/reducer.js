"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const map_1 = require("../utils/map");
const INIT_STATE = {
    players: [],
    positions: {},
    map: [],
    time: 0,
    index: { via_x: {}, via_y: {} }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = __assign({}, INIT_STATE), action) => {
    console.log(action.type);
    switch (action.type) {
        case "GAME:INIT":
            return {
                map: action.map,
                players: action.players,
                positions: action.positions,
                index: map_1.createIndexedMap(action.map),
                time: 0
            };
        case "GAME:SELECT_POSITION":
            return __assign({}, state, { players: state.players.map(player => {
                    if (player.id == action.player.id) {
                        return __assign({}, player, { coords: action.coords });
                    }
                    return player;
                }) });
        case "GAME:MOVE":
            const positions = map_1.getPositionForPlayerAfterMove(state, action.player, action.direction);
            console.log(positions);
            return __assign({}, state, { positions: __assign({}, state.positions, { [action.player.id]: positions }) });
    }
    return state;
};
