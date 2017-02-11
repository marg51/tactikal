import {createStore, applyMiddleware} from "redux"

const createLogger = require("redux-logger")

import tkMiddleware from "./redux/middleware"
import reducer from "./redux/reducer"

// const store = createStore(() => ({}), applyMiddleware(createLogger(), tkMiddleware))
const store = createStore(reducer, applyMiddleware(tkMiddleware))

import {initGame, move} from "./redux/actions"
import {createMap} from "./utils/map"

const players:PLAYER[] = [{
    id: 1,
    name: "un"
}, {
    id: 2,
    name: "deux"
}]
const positions = {1: {x:3,y:3}, 2: {x: 12, y: 12}}

const game = initGame(players, createMap(19, 19, {}), positions)

store.dispatch(game)
enum DIRECTION {
    up, down, left, right
}


store.dispatch(move(players[0], DIRECTION.right))

import {renderMap} from "./utils/map"

renderMap(store.getState())
