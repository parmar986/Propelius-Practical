import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { CartProvider, useCart } from '../store/CartContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// No custom icon components needed - using vector icons directly

// Cart Badge Component
const CartIconWithBadge = ({ color }: { color: string }) => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <View>
      <Icon name="shopping-cart" size={24} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
};

// Home Stack Navigator (for Product List and Detail)
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <Icon name="grid" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="List"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <Icon name="list" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <CartIconWithBadge color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="heart" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator: React.FC = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#111827',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 20,
    paddingTop: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  badge: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
});

export default AppNavigator;
