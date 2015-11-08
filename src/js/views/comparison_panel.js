/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone-modal',
], function ($, _, Backbone) {
    'use strict';
    var ComparisonPanelView = Backbone.Modal.extend({
        template: _.template($('#modal-template').html()),
        initialize: function(objects){
            this.collection = objects;
        },
        serializeData: function(){
            var data = {
                    'object1' : this.collection[0].toJSON(),
                    'object2':this.collection[1].toJSON()
                };
            return data;
        },
        cancelEl: '.bbm-button'
    });
    return ComparisonPanelView;
});