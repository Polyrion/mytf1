import React, {useRef, useState} from 'react';
import {
	StyleSheet,
	View,
	Image,
	ImageBackground,
	Text,
	Pressable,
	ScrollView,
	Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '@theme/';
import LiveIcon from '@components/LiveIcon';
import Catalog from '@components/Catalog';

import Data from '../../../data.json';

const {height, width} = Dimensions.get('window');

export default function Home() {
	const navigation = useNavigation();
	const scrollRef = useRef(null);
	const [data] = useState<any>(Data);
	const {one, catalog, lives} = data;

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.header}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						resizeMode="contain"
						source={{
							uri: 'https://res.cloudinary.com/dlpalbban/image/upload/v1633129902/MyTF1%20Test%20Project/mytf1_ujlfmc.png',
						}}
					/>
				</View>
			</View>
			<ScrollView
				ref={scrollRef}
				scrollEnabled={true}
				scrollEventThrottle={16}
				style={styles.scrollView}>
				<View style={styles.firstTrendContainer}>
					<View style={styles.posteriesContainer}>
						<ImageBackground
							style={styles.poster}
							resizeMode="cover"
							source={{uri: one.poster}}
						/>
					</View>
					<View style={styles.oneInfo}>
						<Text style={styles.title}>{one.title}</Text>
						<Text style={styles.entitle}>{one.entitle}</Text>
						<Text style={styles.description}>{one.description}</Text>
						<Pressable onPress={() => console.log('Go to replay', one.id)}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Voir le replay</Text>
							</View>
						</Pressable>
					</View>
				</View>
				<View style={styles.sectionContainer}>
					<View style={styles.sectionTitleContainer}>
						<Text style={styles.sectionTitle}>En direct sur nos chaînes</Text>
						<LiveIcon />
					</View>
					<Catalog data={lives} navigation={navigation} />
				</View>
				<View style={styles.sectionContainer}>
					<View style={styles.sectionTitleContainer}>
						<Text style={styles.sectionTitle}>Tendances actuelles</Text>
					</View>
					<Catalog data={catalog} navigation={navigation} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	header: {
		position: 'relative',
		height: 60,
		backgroundColor: 'transparent',
		padding: 20,
	},
	scrollView: {
		flex: 1,
	},
	logoContainer: {
		position: 'relative',
		justifyContent: 'center',
		flex: 1,
	},
	logo: {
		width: 100,
		height: 40,
	},
	firstTrendContainer: {
		height: height * 0.7 - 80,
	},
	posteriesContainer: {
		position: 'relative',
		height: height * 0.7 - 80,
		width: width,
	},
	poster: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionContainer: {
		flex: 1,
	},
	sectionTitleContainer: {
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
	},
	sectionTitle: {
		fontSize: 16,
		fontFamily: 'Metropolis-Medium',
		color: Colors.white,
		letterSpacing: 0.5,
		marginRight: 10,
	},
	oneInfo: {
		position: 'absolute',
		minHeight: '30%',
		width: '100%',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary40,
		bottom: 0,
	},
	title: {
		fontSize: 30,
		fontFamily: 'Metropolis-Bold',
		textTransform: 'uppercase',
		color: Colors.white,
		lineHeight: 44,
		letterSpacing: 1,
	},
	entitle: {
		fontSize: 16,
		fontFamily: 'Metropolis-Regular',
		textTransform: 'uppercase',
		color: Colors.white,
	},
	description: {
		fontSize: 16,
		fontFamily: 'Metropolis-Light',
		color: Colors.white,
		marginTop: 15,
		textAlign: 'center',
	},
	button: {
		minHeight: 20,
		minWidth: 100,
		borderWidth: 2,
		borderRadius: 20,
		borderColor: Colors.white,
		padding: 20,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Metropolis-Bold',
		color: Colors.white,
	},
});
