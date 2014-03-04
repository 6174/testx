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
		this.listenTo(this.model, 'add-spec', function(specModel){
			this.addSpec(specModel);
		});
	},
	render: function(){
		this.$el.html(this.suitTemplate(this.model.toJSON()));
		return this;
	},
	addSpec: function(specModel){
		var specNode = $(this.specTemplate(specModel.toJSON()));
		this.$('.test-specs').append(specNode);
	}
});

function getSuitTemplateFunc(){
	var src = path.join(__dirname, '../../../templates/test-suit/', 'suit.ejs');
	var str = fs.readFileSync(src);

	return window.hehe = ejs.compile(String(str));
};

function getSpecTemplateFunc(){
	var src = path.join(__dirname, '../../../templates/test-suit/', 'spec.ejs');
	var str = fs.readFileSync(src);
	return ejs.compile(String(str));
}

module.exports = TestSuitView;