/**
 * Test suits Models
 */
var TestSpecModel = Backbone.Model.extend({
    defaults: function() {
        return {
            passed: 0,
            failed: 0,
            total: 0,
            pending: 0,
            id: 0,
            groupName: '',
            description: '',
            name: 'spec-name',
            items: []
        };
    }
});

var TestSuitModel = Backbone.Model.extend({
    defaults: function() {
        return {
            id: "suite1",
            description: "suit-description",
            fullName: "suit-full-name",
            specs: []
        }
    },
    initialize: function() {
        this.on('change:specs', function() {
            console.log('change-specs');
        });
    },
    addSpec: function(specConfig) {
        var spec = new TestSpecModel(specConfig);
        this.get('specs').push(spec);
        this.trigger('add-spec', spec);
    }
});
var TestSuitCollection = Backbone.Collection.extend({
    model: TestSuitModel,
    initialize: function() {
        this.hashedSuits = {};
        this.on('add', function(model) {
            console.log('add-model', model.toJSON());
            this.hashedSuits[model.get('fullName')] = model;
        });
    },
    addSpec: function(specConfig) {
        console.log('add-spec', specConfig);
        var groupName = specConfig.groupName;
        var suit = this.hashedSuits[groupName];
        if (!suit) {
            throw new Error('no suits');
        }
        suit.addSpec(specConfig);
    }
});
var testSuits = new TestSuitCollection();
module.exports = testSuits;