/**
 * TestSuit View
 */
var fs = require('fs-extra'),
	path = require('path'),
	ejs = require('ejs');

var TestSuitView = Backbone.View.extend({
	tagName: 'div',
	className: 'tx-test-suit',
	attributes: {},
	suitTemplate: getSuitTemplateFunc(),
	specTemplate: getSpecTemplateFunc(),
	events: {},
	initialize: function(){
		//
	},
	render: function(suitModel){
		this.$el.html(this.suitTemplate(suitModel));
	},
	appendSpec: function(specModel){
		var specNode = $(this.specTemplate(specModel));
		this.$('.test-specs').append(specNode);
	}
});

function getSuitTemplateFunc(){
	var src = path.join(__dirname, '../../../templates/test-suit/', 'suit.ejs');
	var str = fs.readFileSync(filename);

	return window.hehe = ejs.compile(String(str));
};

function getSpecTemplateFunc(){
	var src = path.join(__dirname, '../../../templates/test-suit/', 'spec.ejs');
	var str = fs.readFileSync(filename);
	return ejs.compile(String(str));
}

module.exports = TestSuitView;