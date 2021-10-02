/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState, useEffect} from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	GestureResponderEvent,
	Animated,
	View,
	Image,
	ImageSourcePropType,
} from 'react-native';
import Spinner from 'react-native-spinkit';

export interface Props {
	text?: string;
	textColor?: string;
	disableButton?: boolean;
	disableValidate?: boolean;
	disabledBackgroundColor?: string;
	backgroundColor?: string;
	triggerButton?: boolean;
	callback?: (event: GestureResponderEvent) => void;
	isFetching?: boolean;
	icon?: ImageSourcePropType;
	style?: any;
}

const Button: React.FC<Props> = props => {
	const {
		text,
		textColor,
		backgroundColor,
		disabledBackgroundColor,
		disableValidate,
		disableButton,
		isFetching,
		icon,
		callback,
		style,
	} = props;
	let [color] = useState<Animated.Value>(new Animated.Value(0));

	const unAutorized = () => console.log("can't go futher");

	useEffect(() => {
		Animated.timing(color, {
			toValue: disableValidate ? 1 : 0,
			duration: 250,
			useNativeDriver: false,
		}).start();
	}, [color, disableValidate]);

	return (
		<TouchableOpacity
			onPress={
				!disableButton ? callback : disableValidate ? callback : unAutorized
			}>
			<Animated.View
				style={[
					style && {...props.style},
					styles.container,
					disableButton
						? {
								backgroundColor: color.interpolate({
									inputRange: [0, 1],
									outputRange: [
										disabledBackgroundColor || 'transparent',
										backgroundColor || 'transparent',
									],
								}),
						  }
						: {backgroundColor},
				]}>
				{!isFetching ? (
					<View style={styles.row}>
						{icon && <Image source={icon} style={styles.icon} />}
						<Text
							style={[
								styles.text,
								Boolean(icon) && styles.marginText,
								{color: textColor},
							]}>
							{text}
						</Text>
					</View>
				) : (
					<Spinner
						isVisible={true}
						size={30}
						type="ThreeBounce"
						color={textColor}
					/>
				)}
			</Animated.View>
		</TouchableOpacity>
	);
};

Button.defaultProps = {
	text: 'Iam a button',
	textColor: '#fff',
	disableButton: false,
	backgroundColor: 'transparent',
	disabledBackgroundColor: 'transparent',
	triggerButton: false,
	disableValidate: false,
	callback: () => console.log('Button pressed !'),
};

const styles = StyleSheet.create({
	container: {
		width: 250,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 24,
	},
	icon: {
		marginRight: 30,
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,
		height: 20,
	},
	text: {
		fontSize: 16,
		fontFamily: 'Metropolis-Medium',
		letterSpacing: 1,
	},
	marginText: {
		marginRight: 15,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default Button;
