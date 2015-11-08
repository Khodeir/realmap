/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';
    var MapRouter = Backbone.Router.extend({
        initialize: function(options){
            this.placeList = options.placeList;
        },
        routes: {
            '*place' : 'setPlace'
        },
        setPlace: function(params) {
            this.placeList.setSelected(params);
        }
    });
    return MapRouter;
});