"use strict";
const moves_1 = require("../rules/moves");
const mapHelpers = require("../utils/map");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = store => next => (action) => {
    if (typeof action == "function") {
        action = action(store.dispatch, store.getState);
    }
    if (action.type == "GAME:MOVE") {
        if (!moves_1.canMove(store.getState(), action.player, action.direction)) {
            console.log("[rule]: can't move", action);
            return;
        }
    }
    if (action.type == "GAME:SELECT_POSITION") {
        if (mapHelpers.getPlayerOnCoords(store.getState(), action.coords) != action.player.id) {
            console.log("[rule]: can't select", action);
            return;
        }
    }
    next(action);
};
