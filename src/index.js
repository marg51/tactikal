"use strict";
const redux_1 = require("redux");
const createLogger = require("redux-logger");
const middleware_1 = require("./redux/middleware");
const reducer_1 = require("./redux/reducer");
// const store = createStore(() => ({}), applyMiddleware(createLogger(), tkMiddleware))
const store = redux_1.createStore(reducer_1.default, redux_1.applyMiddleware(middleware_1.default));
const actions_1 = require("./redux/actions");
const map_1 = require("./utils/map");
const players = [{
        id: 1,
        name: "un"
    }, {
        id: 2,
        name: "deux"
    }];
const positions = { 1: { x: 3, y: 3 }, 2: { x: 12, y: 12 } };
const game = actions_1.initGame(players, map_1.createMap(19, 19, {}), positions);
store.dispatch(game);
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["up"] = 0] = "up";
    DIRECTION[DIRECTION["down"] = 1] = "down";
    DIRECTION[DIRECTION["left"] = 2] = "left";
    DIRECTION[DIRECTION["right"] = 3] = "right";
})(DIRECTION || (DIRECTION = {}));
store.dispatch(actions_1.move(players[0], DIRECTION.right));
const map_2 = require("./utils/map");
map_2.renderMap(store.getState());
