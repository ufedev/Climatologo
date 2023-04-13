/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {globales} from './src/styles';
import Carta from './src/components/Carta';
function App(): JSX.Element {
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        onPress={() => {
          cerrarTeclado();
        }}>
        <View style={styles.contenedor}>
          <Carta />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contenedor: {
    ...globales.contenedor,
  },
});

export default App;
