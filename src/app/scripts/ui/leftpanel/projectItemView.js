/**
 * project Item view
 */
var ejs = require('ejs'),
    fs = require('fs-extra'),
    path = require('path');

var ProjectItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'project-item',
    attributes: {},
    template: getProjectItemTemplate(),
    events: {
        'click': 'showProject',
        'click .del': 'deleteProject'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    showProject: function() {
    	$('.project-item').removeClass('active');
    	this.$el.addClass('active');
        this.model.updateFromSettingFile();
        mediator.emit('show-project', {
            config: this.model.toJSON()
        });
    },
    deleteProject: function(ev) {
        ev.stopPropagation();
        this.model.destroy();
        return false;
    }
});

function getProjectItemTemplate() {
    var src = path.join(__dirname, '../../../templates/project/', 'project-item.ejs');
    var str = fs.readFileSync(src);
    return ejs.compile(String(str));
}
module.exports = ProjectItemView;