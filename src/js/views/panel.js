/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';
    // the panel view is called with the place list as its model
    var PanelView = Backbone.View.extend({

        template: _.template($('#panel_template').html()),
        events: {
            'click button.addToCompare': 'addToCompare',
        },
        render: function(){
            this.$el.html(''); //clear

            var root = this.model.getSelected();
            
            if (!root || root.id === 'root'){
                return; //no cairo panel
            }

            var context = {
                        'title':root.get('title'), 
                        'description':root.get('description')
                    };

            this.$el.html(this.template(context));
        },
        initialize: function(){
            this.model.on('change:selected', this.render, this);
        },     
        addToCompare: function(){
            var root = this.model.getSelected();
            this.trigger('addToCompare', root);
        }

    });

    return PanelView;

});