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
        initialize: function(options){
            this.localStorage = new Store(options.storeName);
        },
    });

    return CompareCollection;
});
