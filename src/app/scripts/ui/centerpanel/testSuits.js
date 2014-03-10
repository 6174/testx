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
    },
    initialize: function(arguments){
        this.addHrefLinkTospecConfig();
    },
    addHrefLinkTospecConfig: function(){
        var items = this.get('items');
        // http://localhost:5051/tmp/specs.js:519:35
        var reg = /\((http.*?specs\.js).(\d.*?):(\d.*?)\)/gi;
        items.forEach(function(it){
            var str = it.stack, links;

            links = str.match(reg);
            links.forEach(function(link){
                var groups = /\((http.*?specs\.js).(\d.*?):(\d.*?)\)/gi.exec(link) || [];
                var line = groups[2];
                var row  = groups[3];
                str = str.replace(link, '<a href="#" class="script-view-link" data-line="' + line + '" data-row="' + row+ '">' + link + '<\/a>');
            });
            it.stack = str;
        });
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
        this.specCount = 0;
        this.pendingCount = 0;
        this.errorCount = 0;
        this.passCount = 0;

        this.on('add', function(model) {
            console.time('suit');
            console.log('-----------------addSuitModel');
            this.hashedSuits[model.get('fullName')] = model;
        });
    },
    addSpec: function(specConfig) {
        var groupName = specConfig.groupName;
        var suit = this.hashedSuits[groupName];
        if (!suit) {
            throw new Error('no suits');
        }
        suit.addSpec(specConfig);
        this.increaseSpec(specConfig);
    },
    increaseSpec: function(specConfig){
        console.log(specConfig);
        this.specCount ++;

        if(specConfig.failed > 0){
            this.errorCount += 1;
            mediator.emit('spec-falied');
        }

        if(specConfig.pending > 0){
            this.pendingCount += 1;
        }

        if(specConfig.passed > 0){
            this.passCount += 1;
        }

        mediator.emit('increase-spec', {
            specCount: this.specCount,
            passCount: this.passCount,
            errorCount: this.errorCount,
            pendingCount: this.pendingCount
        });
    }, 
    resetTest: function(){
        this.specCount = 0;
        this.passCount = 0;
        this.errorCount = 0;
        this.pendingCount = 0;
        this.hashedSuits = {};
        this.reset();
    }
});
var testSuits = new TestSuitCollection();
module.exports = testSuits;