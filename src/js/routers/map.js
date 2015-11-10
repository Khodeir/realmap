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
            if(params){
                return this.placeList.setSelected(params);
            }
            this.navigate('root', {trigger:true});
        }
    });
    return MapRouter;
});