/*global define*/

define([
    'underscore',
    'backbone',
    'collections/compare_list',
], function (_, Backbone, CompareList) {
    'use strict';
    var CompareModel = Backbone.Model.extend({
            defaults: {
                byType: {'district': new CompareList({storeName:'districts'}),
                        'compound': new CompareList({storeName:'compounds'})},
                maxLength: 2
            },
            add: function(place){
                var type = place.get('type');
                var collection = this.getAll(type);
                if(collection.length < this.get('maxLength')){
                    collection.create(place.toJSON());
                    return this.trigger('add:comparing');
                }
                this.trigger('exceed:comparing');
            },
            remove: function(place){
                place.destroy();
                this.trigger('remove:comparing');
            },
            contains: function(placeId,type){
                if(type){
                    if(this.getAll(type).get(placeId)){
                        return true;
                    }
                    return false;
                }
                return _.some(
                        _.map(this.get('byType'),
                            function(collection){
                                return collection.get(placeId);
                            })
                        );
            },
            getAll: function(type){
                return this.get('byType')[type];
            }   
        });
    return CompareModel;
});