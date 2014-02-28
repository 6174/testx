/**
 * tx header
 */
var util = require('util');

var NavigationView = Backbone.View.extend({
	el: '#TxNav',
	els: {},
	events: {
		'click #BtnAddProject': 'clickInputFileEl',
		'change #IptAddProject': 'addProject'
	},

	initialize: function(){
		console.log('initialize nav view');
		this.els['ipt-file'] = this.$('#IptAddProject');
		this.els['btn-add-project'] = this.$('#BtnAddProject'); 
	},
	clickInputFileEl: function(){
		this.els['ipt-file'].click();
	},
	addProject: function(){
		var el = this.els['ipt-file'];
		mediator.emit('add-project', { value: el.val()});
		el.val('');
	}
});

module.exports = NavigationView;