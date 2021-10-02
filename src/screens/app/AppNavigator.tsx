import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
	createBottomTabNavigator,
	BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {Home} from '.';
import CustomTabBar from '@components/CustomTabBar';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
	return (
		<Tab.Navigator
			tabBar={(props: BottomTabBarProps) =>
				Platform.OS !== 'web' ? <CustomTabBar {...props} /> : null
			}
			screenOptions={{
				unmountOnBlur: true,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'transparent',
					borderTopWidth: 0,
					position: 'absolute',
					left: 50,
					right: 50,
					bottom: 20,
					height: 100,
				},
			}}>
			<Tab.Screen
				name="home"
				component={Home}
				initialParams={{size: 50, icon: require('@assets/images/home.png')}}
			/>
			<Tab.Screen
				name="summary"
				component={Home}
				initialParams={{size: 60, icon: require('@assets/images/playsoon.png')}}
			/>
			<Tab.Screen
				name="profile"
				component={Home}
				initialParams={{size: 30, icon: require('@assets/images/search.png')}}
			/>
			<Tab.Screen
				name="cart"
				component={Home}
				initialParams={{size: 35, icon: require('@assets/images/download.png')}}
			/>
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<AppStack.Navigator
			screenOptions={{
				...TransitionPresets.SlideFromRightIOS,
				headerShown: false,
			}}>
			<AppStack.Screen name="Tabs" component={TabsNavigator} />
		</AppStack.Navigator>
	);
};
export default AppNavigator;
