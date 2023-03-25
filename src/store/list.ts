import { createSelector, createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from ".";
import { apiCallBegan } from "./middleware/api";

export type ListElement = {
    id?: number,
    message?: string
}

export type ElementAction = {
    type: string,
    payload: ListElement
}

export type AnyElement = any

export type AnyElementAction = {
    type: string,
    payload: AnyElement
}

let lastId = 1000;

const slice = createSlice({
    name: 'list',
    initialState: <ListElement[]>[
        { id: 0, message: 'default item' }
    ],
    reducers: {
        elementAdded: (list, action: ElementAction) => {
            list.push({ ...action.payload, id: ++lastId })
        },
        elementRemoved: (list, action: ElementAction) => {
            return list.filter(element => element.id != action.payload.id)
        },
        elementsLoaded: (list, action: AnyElementAction) => {
            return action.payload.sets.map((set: any, idx: number) => ({
                id: idx,
                message: set.name
            }))
        }
    }
})

export default slice.reducer

export const { elementAdded, elementRemoved, elementsLoaded } = slice.actions;

export const allElements = createSelector((state: RootState) => state.list,
    list => list)

export const loadSets = () => (dispatch: Dispatch, getState: () => RootState) => {
    return dispatch(apiCallBegan({
        url: '/sets',
        method: 'get',
        onSuccess: elementsLoaded.type
    }))
}