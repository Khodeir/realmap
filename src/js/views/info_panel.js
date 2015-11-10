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

            var root = this.placeList.getSelected();
            var rootId = root.get('id');
            var rootType = root.get('type');
            var isInCompare = this.compareModel.contains(rootId, rootType);
            var button = '<button class="addToCompare">Add to Compare</button>';
            
            if (!root || root.id === 'root'){
                return; //no cairo panel
            }

            var context = {
                        'title':root.get('title'), 
                        'description':root.get('description'),
                        'compareButton':(isInCompare ? undefined : button)
                    };

            this.$el.html(this.template(context));
        },
        initialize: function(options){
            this.placeList = options.placeList;
            this.compareModel = options.compareModel;
        },     
        addToCompare: function(){
            var root = this.placeList.getSelected();
            this.trigger('addToCompare', root);
        }

    });

    return PanelView;

});