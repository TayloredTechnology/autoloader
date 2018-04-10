/* eslint no-undef: 0 */
'use strict'

const env = process.env
const isInstalled = require('is-installed').sync
const tape = require('tape')
const lochnest = require('tap-lochnest')(tape, {delimiter: ' | '})
const test = require('tape-promise').default(lochnest)
//const td = require('testdouble')

const otherName = __filename.replace(/\.(spec|sanity|api)\.js$/, '.js')

let other
const resetOther = () => {
	require('clear-require')(otherName)
	other = require(otherName)
}
resetOther()

// Tests

resetOther()

test('check installation of required modules', t => {
	t.true(isInstalled('auto-require'), 'auto-require installed')
	t.true(isInstalled('read-pkg'), 'read-pkg installed')
	t.true(isInstalled('decamelize'), 'decamelize installed')
	t.true(isInstalled('lodash'), 'lodash installed')
	t.true(isInstalled('debug'), 'debug installed')

	t.end()
})
