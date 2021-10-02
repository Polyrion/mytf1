module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blocklist: null,
				allowlist: null,
				safe: true,
				allowUndefined: false,
			},
		],
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					tests: ['./tests/'],
					'@components': './src/components',
					'@assets': './src/assets',
					'@screens': './src/screens',
					'@hooks': './src/hooks',
					'@types': './src/types',
					'@states': './src/states',
					'@theme': './src/theme',
					'@utils': './src/utils',
					'@locales': './src/locales',
					'@api': './src/api',
					'@i18n': './i18n',
				},
			},
		],
		['react-native-reanimated/plugin'],
	],
};
