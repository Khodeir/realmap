/*global define*/

define([
    'underscore',
    'backbone',
    'models/place'
], function (_, Backbone, PlaceModel) {
	'use strict';

    var PlaceCollection = Backbone.Collection.extend({
        model: PlaceModel,
		url: '/api/places',
		getAllBy: function(property, values) {
			return this.filter(function( model ) {

				return _.contains(values, model.get(property));
			});
		},
		getSelected: function(){
			return this.get(this.selected);
		},
		setSelected: function(id){
			this.selected = id;
			this.trigger('change:selected');
		}
	});

    return PlaceCollection;
});
