import * as React from 'react';
import { View, Text, Image, Button, BackHandler, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Guia de Cursos - UFSC',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/ufsclogo.png')} />
          <Text style={styles.title}>Guia de Cursos</Text>
        </View>
        <View style={styles.button}>
          <Button title="Ver Cursos" onPress={() => navigate('ClassesList')} />
        </View>
        <View style={styles.button}>
          <Button title="Sair" onPress={() => BackHandler.exitApp() } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 230,
    width: 160,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 15
  }
});