import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Form from './src/components/Form';
import List from './src/components/List';
import createStore from './src/store';

export default function App() {
  return (
    <Provider store={createStore()}>
      <SafeAreaView>
        <Form />
        <List />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
