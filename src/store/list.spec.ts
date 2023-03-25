import createStore from ".";
import { elementAdded, elementRemoved, ListElement, loadSets } from "./list"
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { ThunkAction, ThunkActionDispatch, ThunkDispatch } from "redux-thunk";

describe("The set list", () => {
    let store = createStore();
    let fakeAxios = new MockAdapter(axios);

    beforeEach(() => {
        store = createStore();
        fakeAxios = new MockAdapter(axios);
    })

    const listSlice = () => store.getState().list;

    it("has a default item", () => {
        expect(store.getState().list.length).toBe(1);
        expect(store.getState().list[0].message).toBe("default item");
    })

    it("adds a list element", () => {
        store.dispatch(elementAdded({
            message: 'New'
        }))

        expect(listSlice().length).toBe(2);
        expect(listSlice()[1].id).toBe(1001);
        expect(listSlice()[1].message).toBe('New');
    })

    it("removes a list element", () => {
        store.dispatch(elementRemoved({ id: 1 }));
        expect(listSlice.length).toBe(0)
    })

    it("loads elements from an api call", async () => {
        fakeAxios.onGet('/sets').reply(200, {
            sets: [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Unlimited' }]
        })

        await store.dispatch(loadSets())

        console.log(listSlice());
        expect(listSlice().length).toBe(3)
        expect(listSlice()[0].message).toBe('Alpha')
    })
})