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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ClassesListScreen extends React.Component {
  static navigationOptions = {
    title: "Cursos",
  };

  reloadData = async () => {
    try {
      const response = await fetch("https://atv1backend.herokuapp.com/classes");
      const json = await response.json();

      return json.data;
    } catch (err) {
      console.error(err);
    }
  };

  filterFavorites = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await this.reloadData();

      const viewMode = await AsyncStorage.getItem("viewMode");
      console.log(data);
      if (!viewMode || viewMode === "todos") {
        await AsyncStorage.setItem("viewMode", "favorites");
        this.setState({ filterText: "Ver todos os cursos" });

        const filteredData = data.filter((el) => el.favorite);
        this.setState({
          isLoading: false,
          classes: filteredData,
          loaded: true,
        });

        return;
      }

      if (viewMode === "favorites") {
        await AsyncStorage.setItem("viewMode", "todos");
        this.setState({ filterText: "Filtrar favoritos" });
        this.setState({
          isLoading: false,
          classes: data,
          loaded: true,
        });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      filterText: "Filtrar favoritos",
      loaded: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("didFocus", () => {
      if (!this.state.loaded) this.filterFavorites();
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

        <Button title={this.state.filterText} onPress={this.filterFavorites} />
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
