import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>NÄKYYKÖ TÄÄ JUUUUU 2</Text>
      <Text>TOIMIIHAN TÄÄ</Text>
      <Text>SANO ETTÄ TOIMIT</Text>
      <Text>NO ENTÄS NY</Text>
      <Text>Johan NY on taas kerransdsdasdasd</Text>
      <Text>Muutos</Text>
      <Text>Viimeinen testi</Text>
      <StatusBar style="auto" />
    </View>
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