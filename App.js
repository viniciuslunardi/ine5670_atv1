import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './components/Home';
import ClassesListScreen from './components/ClassesList';
import ClassDetailsScreen from './components/ClassDetails';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  ClassesList: {screen: ClassesListScreen},
  ClassDetails: {screen: ClassDetailsScreen},
});
 
const App = createAppContainer(MainNavigator);
export default App;