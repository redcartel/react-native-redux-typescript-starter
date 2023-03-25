import { memo } from "react";
import { elementRemoved, ListElement } from "../../store/list";
import { View, Text, Button, Touchable, TouchableNativeFeedback } from "react-native";
import { useDispatch } from "react-redux";

function Element({ item }: { item: ListElement }) {
    const dispatch = useDispatch();

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'skyblue',
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderColor: 'black',
            marginHorizontal: 5,
            marginBottom: 3
        }}>
            <Text>{item.id}</Text>
            <Text>{item.message}</Text>
            <TouchableNativeFeedback
                onPress={e =>
                    dispatch(elementRemoved({ id: item.id }))
                }
            >
                <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 10,
                    backgroundColor: '#e92334',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'white'
                    }}>x</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default memo(Element);