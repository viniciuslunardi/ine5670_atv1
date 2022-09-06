import * as React from 'react';
import { Text, View, StyleSheet, Button, Linking, Platform} from 'react-native';
 
const mapUrl = Platform.select({
   ios: 'maps:0,0?q=' /* valor de mapUrl caso iOS */ ,
   android: 'geo:0,0?q=' /* valor de mapUrl caso Android */
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
      phone: course.phone,
      lat: course.address.geo.lat,
      lng: course.address.geo.lng,
      
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, email, phone, lat, lng } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.contactDetails}>E-mail: {email}</Text>
          <Text style={styles.contactDetails}>Telefone: {phone}</Text>
        </View>
        <View style={styles.button} >
          <Button onPress={() => Linking.openURL(`mailto:${email}`) }
            title="Enviar E-mail" />
        </View>
        <View style={styles.button} >
        <Button onPress={() => Linking.openURL(`tel:${phone}`) }
          title="Ligar" />
        </View>
    
        <View style={styles.button} >
        <Button onPress={() => Linking.openURL(`${mapUrl}${lat},${lng}`) }
          title="Coordenadas" />
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
  }
});