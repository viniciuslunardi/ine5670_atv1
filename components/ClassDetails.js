import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Linking,
  Platform
} from 'react-native';

const mapUrl = Platform.select({
  ios: 'maps:0,0?q=',
  android: 'geo:0,0?q='
});

export default class ClassDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Dados do Curso',
  };

  constructor(props) {
    super(props);
    const course = props.navigation.getParam('class');
    this.state = {
      name: course.name,
      email: course.email,
      campus: course.campus,
      shift: course.shift,
      hours: course.hours,
      images: course.images,
      lat: course.coords[0],
      lng: course.coords[1],
      video: course.video,
      site: course.site,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      name,
      email,
      campus,
      shift,
      lat,
      lng,
      hours,
      phone,
      images,
      video,
      site } = this.state;

    return (
      <View>
       
        <View style={styles.container}>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.contactDetails}>Logo:</Text>
          <Image style={styles.logo} source={require('../assets/ufsclogo.png')} />
          <Text style={styles.contactDetails}>E-mail: {email}</Text>
          <Text style={styles.contactDetails}>Site: {site}</Text>
          <Text style={styles.contactDetails}>Campus: {campus}</Text>
          <Text style={styles.contactDetails}>Turno: {shift}</Text>
          <Text style={styles.contactDetails}>Carga horária: {hours}</Text>
          <Text style={styles.contactDetails}>Salas de aula:</Text>
          <Image style={styles.image} source={require('../assets/ufsclogo.png')} />
          <Image style={styles.image} source={require('../assets/ufsclogo.png')} />
        </View>
       
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`mailto:${email}`)}
            title="Enviar E-mail para coordenadoria" />
        </View>
       
        <View style={styles.button} >
          <Button onPress={() => console.log("Favoritou! //TODO")}
            title="Favoritar" />
        </View>
      
        {/* <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`tel:${phone}`)}
            title="Telefonar para coordenadoria" />
        </View> */}

        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`${mapUrl}${lat},${lng}`)}
            title="Coordenadas para o campus" />
        </View>
       
        <View style={styles.button} >
          <Button title="Voltar" onPress={() => navigate('ClassesList')} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  contactDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15
  },
  image: {
    height: 230/2,
    width: 160/2,
  },
  logo: {
    height: 230,
    width: 160,
  },
});