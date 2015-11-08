/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mapbox'
], function ($, _, Backbone) {
    'use strict';
    var L = window.L; // mapbox doesnt support AMD well
    // the map view is called with the place list as its model 
    var MapView = Backbone.View.extend({
    id: 'map',
        initialize: function(){
            // Create a map in the div #map
            var cairoNW = [30.26974231529823,31.719589233398438];
            var cairoSE = [29.780469683486622,30.741806030273434];

            L.mapbox.accessToken = 'pk.eyJ1Ijoia2hvZGVpciIsImEiOiJjaWcycTNrYzkxZTZ3dHprdmRkNmNsYWhyIn0.RKJ8DFsV79DO63p1QdT_yA';
            
            // Create a map in the div #map
            this.map = L.mapbox.map('map','mapbox.pirates',
                {
                    minZoom: 11,
                    maxBounds: [cairoNW,cairoSE],
                    zoom: 11,
                    updateWhenIdle: true

                });

            this.polygon = null;
            this.children = [];
            this.setupListeners();
            this.model.on('change:selected', this.render, this);
        },
        setupOverlays: function(){
            var placeList = this.model;
            var root = placeList.getSelected();
            var polygon = root.get('polygon');        

            if(polygon !== null){
                this.polygon = L.geoJson(polygon);
                this.polygon.setStyle({fillOpacity:0});
            }

            var children = placeList.getAllBy('id',root.get('children'));
            this.children = children.map(function(child){
                var polygon = child.get('polygon');
                var childLayer = L.geoJson(polygon);

                // set click navigation
                childLayer.on('click', function(){
                    placeList.setSelected(child.get('id'));
                });

                return childLayer;
            });


        },
        addOverlays: function(){
            var map = this.map;
            if(this.polygon){
                this.polygon.addTo(map);
            }
            
            this.children.forEach(
                function(child){
                    child.addTo(map);
                });
        },
        removeOverlays: function(){
            var map = this.map;
            if(this.polygon){
                map.removeLayer(this.polygon);
                this.polygon = null;
            }
            this.children.forEach(function(child){
                map.removeLayer(child);
            });
            this.children = [];
        },
        setViewPoint: function(){
            var map = this.map;
            var root = this.model.getSelected();
            var minZoom = root.get('minZoom');
            var maxZoom = minZoom + 1;  

            map.options.maxZoom = maxZoom;
            if(this.polygon){
                var bounds = this.polygon.getBounds();

                // NOW TO PAN THE MAP
                // map.fitBounds(bounds);
                // map.setMaxBounds(bounds);

                //          OR
                map.setView(bounds.getCenter(), minZoom);

            }
            else{
                var cairoCenter = [30.0500, 31.2333];
                map.setView(cairoCenter, 11);
            }

        },
        setupListeners: function(){
            var map = this.map;
            this._zoomstart = function(){
                this.lastZoom = map.getZoom();
            };
            this._zoomend = function(){
                var currentZoom = map.getZoom();
                
                if(this.lastZoom){
                    if(currentZoom < this.lastZoom){
                        this.handleZoomOut();
                    }
                    else if(this.lastZoom < currentZoom){
                        this.handleZoomIn();
                    }
                }
                
            };
        },
        addListeners: function(){
            this.map.on('zoomstart', this._zoomstart, this);
            this.map.on('zoomend', this._zoomend, this);
        },
        removeListeners: function(){
            if(this.map.hasEventListeners('zoomstart')){
                this.map.off('zoomstart', this._zoomstart);
            }
            if(this.map.hasEventListeners('zoomend')){
                this.map.off('zoomend', this._zoomend);
            }
        },
        handleZoomOut: function(){
            var root = this.model.getSelected();
            if ((root.get('parent') !== null) && (this.lastZoom === root.get('minZoom'))){
                this.model.setSelected(root.get('parent'));
            }
        },
        handleZoomIn: function(){
        },
        render: function(){
            this.removeListeners();
            this.removeOverlays();
            this.setupOverlays();
            this.setViewPoint();
            this.addOverlays();
            this.addListeners();
        },
    });

    return MapView;
});
