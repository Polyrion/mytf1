import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '@theme/';

const LiveIcon = () => {
	return (
		<View style={styles.container}>
			<View style={styles.dot} />
			<Text style={styles.text}>Live</Text>
		</View>
	);
};

export default LiveIcon;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: 60,
		height: 30,
		backgroundColor: Colors.danger,
		borderRadius: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
	},
	dot: {
		height: 10,
		width: 10,
		backgroundColor: Colors.white,
		borderRadius: 5,
	},
	text: {
		fontSize: 14,
		fontFamily: 'Metropolis-Bold',
		textTransform: 'uppercase',
		color: Colors.white,
	},
});
