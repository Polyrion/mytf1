import React from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	Pressable,
	Image,
	Dimensions,
	Platform,
} from 'react-native';

import {Live, Catalog as CatalogType} from '../types/data';

interface Props {
	data: Live[] | CatalogType[];
	navigation: any;
}

const {height, width} = Dimensions.get('window');

const Catalog = ({data, navigation}: Props) => {
	const renderItem = ({item}: any) => {
		return (
			<Pressable onPress={() => navigation.navigate('Show', {data: item})}>
				<View
					style={[
						styles.showContainer,
						Platform.OS === 'web' && styles.showContainerWeb,
					]}>
					<Image
						style={styles.poster}
						resizeMode="cover"
						source={{uri: item.min_poster || item.poster}}
					/>
				</View>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				data={data}
				keyExtractor={(item, index) => `key${index}`}
				renderItem={renderItem}
				snapToInterval={width - 80}
				decelerationRate={0}
				bounces={false}
			/>
		</View>
	);
};

export default Catalog;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	showContainer: {
		position: 'relative',
		height: height / 4,
		width: width / 2,
		marginHorizontal: 5,
		borderRadius: 10,
		justifyContent: 'center',
	},
	showContainerWeb: {
		height: height / 2,
		width: width / 4,
	},
	poster: {
		flex: 1,
		borderRadius: 10,
	},
});
