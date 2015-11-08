/*global define*/

define([
    'underscore',
    'backbone',
    'models/place',
    'backbone.localStorage'
], function (_, Backbone, PlaceModel) {
    'use strict';
    var Store = window.Store;

    var CompareCollection = Backbone.Collection.extend({
        model: PlaceModel,

        maxLength: 2,
        initialize: function(options){
            this.localStorage = new Store(options.storeName);
        },
        getAllBy: function(property, values) {
            return this.filter(function( model ) {

                return _.contains(values, model.get(property));
            });
        },

        });

    return CompareCollection;
});
