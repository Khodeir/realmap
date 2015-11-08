/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';
    var PlaceModel = Backbone.Model.extend({
          defaults: {
            id: 'root',
            parent:null,
            children:[],
            polygon:null,
            minZoom: 11,
            title:'',
            description:'',
          },
    });

    return PlaceModel;
});
