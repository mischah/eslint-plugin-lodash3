/**
 * @fileoverview Rule to check if a call to filter should be a call to compact
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function isDoubleNegationOfParam(exp, paramName) {
        return astUtil.isNegationExpression(exp) && astUtil.isNegationExpression(exp.argument) && astUtil.isIdentifierOfParam(exp.argument.argument, paramName);
    }

    function isCallToBooleanCastOfParam(exp, paramName) {
        return exp.type === 'CallExpression' && exp.callee.name === 'Boolean' && astUtil.isIdentifierOfParam(exp.arguments[0], paramName);
    }

    function isBooleanCastingFunction(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var paramName = astUtil.getFirstParamName(func);
        return (func && func.type === 'Identifier' && func.name === 'Boolean') ||
            (astUtil.isReturnStatement(firstLine) && (astUtil.isIdentifierOfParam(firstLine.argument, paramName) ||
            isDoubleNegationOfParam(firstLine.argument, paramName) || isCallToBooleanCastOfParam(firstLine.argument, paramName)));

    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isFilter(node) && isBooleanCastingFunction(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.compact over filtering of Boolean casting');
            }
        }
    };
};
