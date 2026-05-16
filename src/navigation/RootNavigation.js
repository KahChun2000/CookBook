import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';

import LoginScreen from '../screens/auth/login';
import SignupScreen from '../screens/auth/register';
import HomeScreen from '../screens/app/home/main';
import Recipe from '../screens/app/recipe/main';
import RecipeDetail from '../screens/app/recipe/detail';
import MyRecipe from '../screens/app/recipe/myRecipe';
import RecipeForm from '../screens/app/recipe/form';
import Profile from '../screens/app/profile/main';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recipes" component={Recipe} />
      <Tab.Screen name="MyRecipe" component={MyRecipe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={AppTabs} />
      <AppStack.Screen name="RecipeDetail" component={RecipeDetail} />
      <AppStack.Screen name="RecipeForm" component={RecipeForm} />
    </AppStack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, booting } = useContext(AuthContext);

  if (booting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
