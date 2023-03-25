import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
// import StoreContext from "../context/storeContext";
import { allElements, elementRemoved, loadSets } from "../../store/list";
import Element from "./Element";

export default function List() {
    const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch();
    const list = useSelector(allElements);

    useEffect(() => {
        dispatch(loadSets())
    }, [])

    return (
        // <View>
        //     {list.map(element => (
        //         <View key={element.id} style={{ flexDirection: 'row' }}>
        //             <Text>{element.id} : {element.message}</Text>
        //             <Button title='x' onPress={() => {
        //                 dispatch(elementRemoved({ id: element.id }))
        //             }} />
        //         </View>
        //     ))}
        // </View>
        <FlatList
            data={list}
            keyExtractor={item => `${item.id}${item.message}`}
            renderItem={item => (
                <Element item={item.item} />
            )}
        />
    )
}