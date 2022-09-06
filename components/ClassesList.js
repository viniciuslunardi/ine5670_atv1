import * as React from "react";
import {
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default class ClassesListScreen extends React.Component {
  static navigationOptions = {
    title: "Cursos",
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("didFocus", () => {
      return fetch('https://atv1backend.herokuapp.com/classes')
        .then((response) => response.json())
        .then((json) => {
          this.setState(
            {
              isLoading: false,
              classes: json,
            },
            function () { }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.classes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate("ClassDetails", { class: item })}
            >
              <SafeAreaView>
                <Text style={styles.class}>{item.name}</Text>
              </SafeAreaView>
            </TouchableOpacity>
          )}
        />
        <Button title="Voltar" onPress={() => navigate("Home")} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  class: {
    fontSize: 18,
    height: 44,
  },
});
