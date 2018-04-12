const _ = require('lodash')
const debug = require('debug')('autoLoader')
const decamelize = require('decamelize')

const alwaysIgnore = ['per-env', 'pino-debug']

const ns = {}
let aliases = {}
let exModules = alwaysIgnore
let devToggle = false

function autoLoad(modules) {
	// Ensure that dev-dependencies, globals and breaking libraries are not automatically loaded
	let exDevDependencies = []
	if (!devToggle) {
		const getPkg = require('read-pkg').sync()
		exDevDependencies = Object.keys(getPkg.devDependencies)
	}

	let npm
	const requireModules = {}
	const without = _.uniq(_.concat(exDevDependencies, exModules))

	if ((typeof modules).includes('undefined')) {
		npm = require('auto-require')({
			without: _.uniq(without)
		})
	} else {
		let preAliasArray = []
		if ((typeof modules).includes('string')) {
			preAliasArray = [modules]
		} else if (_.isArray(modules)) {
			preAliasArray = modules
		}

		if (modules.only) {
			preAliasArray = modules.only
		}

		let aliasArray = []
		aliasArray = preAliasArray.map(item => {
			if (_.keys(aliases).includes(item)) {
				return aliases[item]
			}
			return item
		})

		if (modules.without) {
			requireModules.without = _.uniq(_.concat(without, modules.without))
		} else {
			requireModules.without = _.uniq(without)
		}

		requireModules.only = aliasArray

		debug(requireModules)
		npm = require('auto-require')(requireModules)
	}

	_.keys(npm).map(item => {
		if (_.values(aliases).includes(decamelize(item, '-'))) {
			npm[
				_.keys(aliases)[_.values(aliases).indexOf(decamelize(item, '-'))]
			] = _.cloneDeep(npm[item])
		}
		return true
	})

	return npm
}

ns.general = (modules, aliasRequires) => {
	if (aliasRequires) aliases = _.merge(aliases, _.cloneDeep(aliasRequires))
	devToggle = false
	return autoLoad(modules)
}

ns.development = (modules, aliasRequires) => {
	if (aliasRequires) aliases = _.merge(aliases, _.cloneDeep(aliasRequires))
	devToggle = true
	return autoLoad(modules)
}

ns.init = setup => {
	if (_.has(setup, 'aliases'))
		aliases = _.merge(aliases, _.cloneDeep(setup.aliases))
	if (_.has(setup, 'alias'))
		aliases = _.merge(aliases, _.cloneDeep(setup.alias))
	if (_.has(setup, 'exModules'))
		exModules = _.merge(aliases, _.cloneDeep(setup.exModules))
}

module.exports = ns
