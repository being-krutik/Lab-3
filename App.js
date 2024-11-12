// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './screens/Home';
// import BorrowedBooks from './screens/BorrowedBooks';
// import { Ionicons } from '@expo/vector-icons'; // You can change icon library if you want

// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = 'home';
//             } else if (route.name === 'Borrowed Books') {
//               iconName = 'book';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Borrowed Books" component={BorrowedBooks} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import BookDetail from './screens/BookDetail';
import BorrowedBooksScreen from './screens/BorrowedBooks';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Books List" component={HomeScreen} />
    <Stack.Screen name="Book Detail" component={BookDetail} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Home' ? 'home' : 'book';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Borrowed" component={BorrowedBooksScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
