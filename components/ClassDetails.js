import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Linking,
  Platform,
} from "react-native";

const mapUrl = Platform.select({
  ios: "maps:0,0?q=",
  android: "geo:0,0?q=",
});

export default class ClassDetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Dados do Curso",
  };

  constructor(props) {
    super(props);
    const course = props.navigation.getParam("class");
    this.state = {
      name: course.name,
      email: course.email,
      campus: course.campus,
      shift: course.shift,
      hours: course.hours,
      phone: course.phone,
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
      site,
    } = this.state;

    const classImages = [];

    for (const image of images[0].class) {
      classImages.push(
        <View key={image}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      );
    }

    const app = video.split("v=")[1];

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.contactName}>{name}</Text>

          <Image style={styles.logo} source={{ uri: images[0].icon }} />

          <Text style={styles.classDetails}>E-mail: {email}</Text>
          <Text style={styles.classDetails}>Site: {site}</Text>
          <Text style={styles.classDetails}>Telefone: {phone}</Text>

          <Text style={styles.classDetails}>Campus: {campus}</Text>
          <Text style={styles.classDetails}>Turno: {shift}</Text>
          <Text style={styles.classDetails}>Carga horária: {hours}</Text>
          <Text style={styles.classDetails}>Salas de aula:</Text>

          {classImages}
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => Linking.openURL(`mailto:${email}`)}
            title="Enviar E-mail para coordenadoria"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => console.log("Favoritou! //TODO")}
            title="Favoritar"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => Linking.openURL(`tel:${phone}`)}
            title="Telefonar para coordenadoria"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => Linking.openURL(`${mapUrl}${lat},${lng}`)}
            title="Coordenadas para o campus"
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() =>
              Linking.canOpenURL(`vnd.youtube://${app}`).then((supported) => {
                if (supported) {
                  return Linking.openURL(`vnd.youtube://${app}`);
                } else {
                  return Linking.openURL(video);
                }
              })
            }
            title="Vídeo informativo"
          />
        </View>

        <View style={styles.button}>
          <Button title="Voltar" onPress={() => navigate("ClassesList")} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    height: 44,
  },
  classDetails: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15,
  },
  image: {
    height: 230,
    width: 160,
  },
  logo: {
    height: 180,
    width: 250,
  },
});
