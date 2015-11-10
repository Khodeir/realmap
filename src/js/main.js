'use strict';
require(['/js/config.js'], function() {

    require([
        'backbone',
        'collections/places_list',
        'models/compare',
        'views/map',
        'views/info_panel',
        'views/compare_dash',
        'views/sign_up',
        'routers/map'
    ], function (Backbone, PlaceList, CompareModel, MapView, PanelView, 
                CompareView, SignUpPanelView, Router) {

        var app = {};

        // collections
        app.placeList = new PlaceList();
        app.compareModel = new CompareModel();

        //mapview
        app.mapView = new MapView({
                model: app.placeList
            });
        //mapview listens to
        app.mapView.listenTo(app.placeList, 
                            'change:selected', 
                            app.mapView.render);
        //mapview affects
        app.placeList.listenTo(app.mapView, 
                            'goTo', 
                            app.placeList.setSelected);

        //panelview
        app.panelView = new PanelView({
                placeList: app.placeList, //needs to know which is selected
                compareModel: app.compareModel, //needs to know if in comparelist
                el: '#panel'
            });
        //panelview listens to
        app.panelView.listenTo(app.placeList, 
                            'change:selected',
                            app.panelView.render);
        app.panelView.listenTo(app.compareModel, 
                            'add:comparing',
                            app.panelView.render);
        app.panelView.listenTo(app.compareModel, 
                            'remove:comparing',
                            app.panelView.render);
        //affects
        app.compareModel.listenTo(app.panelView, 
                            'addToCompare',
                            app.compareModel.add);
        
        //compareview
        app.compareView = new CompareView({
                compareModel:app.compareModel
            });
        //compareview listens to
        app.compareView.listenTo(app.compareModel, 
                            'add:comparing',
                            app.compareView.render);
        app.compareView.listenTo(app.compareModel, 
                            'remove:comparing',
                            app.compareView.render);
        //compareview affects 
        app.placeList.listenTo(app.compareView, 
                            'goTo',
                            app.placeList.setSelected);
        app.compareModel.listenTo(app.compareView, 
                            'remove',
                            app.compareModel.remove);

        // sign up modal
        app.compareModel.on('exceed:comparing',function(){
            var context = {
                message: 'Sign up to be able to add more than two places!'
            };
            var view = new SignUpPanelView({model:context});
            $('body').append(view.render().el);
        });


        // router
        app.router = new Router({placeList: app.placeList});

        // start it on successful loading of place list
        app.placeList.fetch().success(function(){
            Backbone.history.start();
            
            // change url on change:selected
            app.placeList.on('change:selected', function(id){
                app.router.navigate(id);
            });
            
        });

        return app;

    });


});
