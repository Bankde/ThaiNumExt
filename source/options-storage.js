import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		numOpt: 'Thai',
		isEnable: true,
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
