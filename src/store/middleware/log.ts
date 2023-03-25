import { AnyAction, Middleware } from "redux";

const log: Middleware = state => next => (action: AnyAction) => {
    console.log(`ACTION TYPE: ${action.type}`)
    console.log(`ACTION PAYLOAD: ${JSON.stringify(action.payload).slice(0, 300)}`)
    next(action)
}

export default log;