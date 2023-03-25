import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { elementAdded } from "../store/list";

export default function Form() {
    const [inputText, setInputText] = useState('');

    const dispatch = useDispatch();

    return (
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                value={inputText}
                onChangeText={setInputText}
                style={{ width: 200, borderWidth: 1, borderColor: 'black' }}
            />
            <Button title="Add" onPress={() => {
                dispatch(elementAdded({
                    message: inputText
                }))
                setInputText('')
            }} />
        </View>
    )
}