import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';

import AppNavigator from '@screens/app/AppNavigator';

const RootStack = createStackNavigator();

const App = () => {
	useEffect(() => {
		const init = async () => {
			// …do multiple sync or async tasks
		};

		Platform.OS !== 'web' &&
			init().finally(async () => {
				await RNBootSplash.hide({fade: true});
			});
	}, []);

	return (
		<RecoilRoot>
			<SafeAreaProvider>
				<NavigationContainer>
					<RootStack.Navigator
						initialRouteName="App"
						screenOptions={{
							...TransitionPresets.SlideFromRightIOS,
							headerShown: false,
						}}>
						<RootStack.Screen name="App" component={AppNavigator} />
					</RootStack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</RecoilRoot>
	);
};

export default App;
