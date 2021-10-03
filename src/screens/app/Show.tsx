import React, {useRef, useState} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	Pressable,
	Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {RouteProp} from '@react-navigation/native';

import {Live, Catalog as CatalogType} from '../../types/data';
import {Colors} from '@theme/';

type RootStackParamList = {
	Show: {
		data: CatalogType | Live;
	};
};

type ProfileScreenNavigationProp = RouteProp<RootStackParamList, 'Show'>;

type Props = {
	route: ProfileScreenNavigationProp;
};

const {height, width} = Dimensions.get('window');

const Show = ({route}: Props) => {
	const {data} = route.params;
	const scrollRef = useRef(null);
	const videoRef = useRef(null);
	const [showControls, setShowControls] = useState(false);
	const [mute, setMute] = useState(true);

	const onBuffer = () => console.log('Callback when remote video is buffering');
	const videoError = () => console.log('Callback when video cannot be loaded');

	return (
		<SafeAreaView style={styles.safeArea}>
			<Pressable onPress={() => setShowControls(true)}>
				<View style={styles.playerContainer}>
					<Video
						source={{uri: data.trailer}}
						ref={(ref: any) => {
							videoRef.current = ref;
						}}
						onBuffer={onBuffer}
						onError={videoError}
						poster={data.poster}
						posterResizeMode="cover"
						style={styles.backgroundVideo}
						controls={showControls}
						repeat={true}
						muted={mute}
						resizeMode="cover"
					/>
					<Pressable
						style={styles.muteButton}
						onPress={() => setMute(prev => !prev)}>
						<Image
							style={styles.controlIcon}
							source={
								mute
									? require('@assets/images/mute.png')
									: require('@assets/images/unmute.png')
							}
						/>
					</Pressable>
				</View>
			</Pressable>
			<ScrollView
				ref={scrollRef}
				scrollEnabled={true}
				scrollEventThrottle={16}
				style={styles.scrollView}>
				<View style={styles.distribution}>
					<Image
						style={styles.distributionLogo}
						source={{uri: data.distribution_logo}}
					/>
				</View>
				<Text style={styles.title}>{data.title}</Text>
				<View style={styles.infos}>
					{data.new && <Text style={styles.new}>Nouveau</Text>}
					<Text style={styles.info}>{data.release_date}</Text>
					<Text style={styles.info}>2h</Text>
					{data.quality.map((value, index) => (
						<Text key={index} style={styles.quality}>
							{value}
						</Text>
					))}
				</View>
				<Text style={styles.category}>
					{data.category} | {data.available_replays} replays
				</Text>
				<Pressable onPress={() => console.log('Add to my List', data.id)}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Ajouter à ma liste</Text>
					</View>
				</Pressable>
				<Text style={styles.description}>{data.description}</Text>
				<View style={styles.episodes}>
					<Text style={styles.sectionTitle}>Episodes</Text>
					{data.episodes.map((episode, index) => (
						<Pressable key={index} onPress={() => console.log('play episode')}>
							<View style={styles.episode}>
								<Image
									style={styles.episodePoster}
									source={{uri: episode.poster}}
									resizeMode="contain"
								/>
								<Text style={styles.episodeTitle}>{episode.title}</Text>
							</View>
						</Pressable>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Show;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	playerContainer: {
		height: height / 4,
		width: width,
		position: 'relative',
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 10,
	},
	muteButton: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		zIndex: 20,
	},
	controlIcon: {
		width: 35,
		height: 35,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 20,
	},
	distribution: {
		marginVertical: 20,
	},
	distributionLogo: {
		height: 20,
		width: 80,
	},
	title: {
		fontSize: 26,
		fontFamily: 'Metropolis-Bold',
		color: Colors.white,
		letterSpacing: 0.5,
	},
	category: {
		fontSize: 16,
		fontFamily: 'Metropolis-Medium',
		color: Colors.white,
	},
	description: {
		fontSize: 16,
		fontFamily: 'Metropolis-Regular',
		color: Colors.white,
		marginVertical: 20,
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
	infos: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	info: {
		fontSize: 16,
		fontFamily: 'Metropolis-Light',
		color: Colors.white,
		marginHorizontal: 5,
	},
	new: {
		fontSize: 16,
		fontFamily: 'Metropolis-Light',
		color: Colors.success,
	},
	quality: {
		fontSize: 16,
		fontFamily: 'Metropolis-Light',
		color: Colors.brokenWhite,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: Colors.brokenWhite,
		padding: 5,
		marginHorizontal: 5,
	},
	episodes: {},
	episode: {
		height: height / 3,
		width: '100%',
		marginBottom: 20,
	},
	episodePoster: {
		flex: 1,
	},
	episodeTitle: {
		fontSize: 16,
		fontFamily: 'Metropolis-Light',
		color: Colors.white,
	},
	sectionTitle: {
		fontSize: 22,
		fontFamily: 'Metropolis-Medium',
		color: Colors.white,
		letterSpacing: 0.5,
	},
});
