var ErrorModalView = Backbone.View.extend({
	el: '#ErrorModal',
	els: {},
	initialize: function(){
		var self = this;
		self.els['title'] = this.$('.modal-title');
		self.els['error'] = this.$('.error');
		mediator.on('ui-error', function(message){
			self.open(message);
		});
	},
	open: function(message){
		this.els['title'].text(': - ( , sorry but something wrong!');
		this.els['error'].text(message);
		$('#ErrorModal').modal();
	}
});

module.exports = ErrorModalView;