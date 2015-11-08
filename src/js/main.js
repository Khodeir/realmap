'use strict';
require(['/js/config.js'], function() {

    require([
        'backbone','collections/places_list','collections/compare_list','views/map','views/panel','views/compare_dash','routers/map'
    ], function (Backbone,PlaceList,CompareList,MapView,PanelView,CompareView,Router) {
        var app = {};


        // collections
        app.placeList = new PlaceList();
        app.compareLists = {
            'compound': new CompareList({storeName:'compounds'}),
            'district': new CompareList({storeName:'districts'})
        };

        //views
        app.mapView = new MapView({model: app.placeList});
        app.panelView = new PanelView({model: app.placeList});
        app.compareView = new CompareView({model:app.compareLists,placeList: app.placeList});
        app.panelView.on('addToCompare', app.compareView.addPlace, app.compareView);
        app.compareView.on('goToThis', function(h){ app.placeList.setSelected(h); });

        // start router history on fetch
        app.router = new Router({placeList: app.placeList});
        app.placeList.fetch().success(function(){

            Backbone.history.start();
        });

        return app;

    });


});
