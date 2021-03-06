'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prop-shorthand');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer property shorthand syntax'}];

ruleTester.run('prop-shorthand', rule, {
    valid: [{
        code: 'var ids = _.map([], function (i) { return x.id; });'
    }, {
        code: 'var ids = _.map([], function (i) { return i.id + "?"; });'
    }, {
        code: 'var publicModules = _(files).map(readModule).compact().value();'
    }, {
        code: 'var ids = _.map([], function (i) { return i[0]; });'
    }, {
        code: 'var ids = _.map([], function (i) { return i[k]; });'
    }, {
        code: 'var r = _.map([], function() { return React.PropTypes.object; })'
    }],
    invalid: [{
        code: 'var ids = _(users).map(function (i) { return i.id; });',
        errors: errors
    }, {
        code: 'var ids = _.map([], function (i) { return i.id; });',
        errors: errors
    }, {
        code: 'var ids = _(users).map("x").map("y").map(function (i) { return i.id; });',
        errors: errors
    }, {
        code: 'var ids = _.map([], function (i) { return i["id"]; });',
        errors: errors
    }]
});
