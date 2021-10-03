import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {Colors} from '@theme/';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
	return (
		<View style={styles.tabBar}>
			<View style={styles.tabContainer}>
				{state.routes.map((route, index) => {
					const {params}: any = route;
					const {options} = descriptors[route.key];
					const isFocused = state.index === index;

					const onPress = () => {
						// console.log('params onPress', params);
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							key={index}>
							<View style={styles.route}>
								{params && params.icon && params.size && (
									<View
										style={[
											styles.iconContainer,
											isFocused
												? styles.iconContainerFocused
												: styles.iconContainerUnfocused,
											{height: params.size, width: params.size},
										]}>
										<Image style={styles.icon} source={params.icon} />
									</View>
								)}
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		height: 40,
		width: '100%',
		backgroundColor: Colors.primary,
	},
	tabContainer: {
		flex: 1,
		position: 'absolute',
		top: -35,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	route: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionFocused: {
		fontSize: 14,
		fontFamily: 'Metropolis-Bold',
		color: Colors.white,
	},
	iconContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainerFocused: {
		opacity: 1,
	},
	iconContainerUnfocused: {
		opacity: 0.2,
	},
	icon: {
		height: 35,
		width: 35,
	},
});

export default CustomTabBar;
