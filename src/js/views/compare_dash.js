/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/comparison_panel'
], function ($, _, Backbone, ComparisonPanelView) {
    'use strict';

    var CompareIconView = Backbone.View.extend({
        template: _.template($('#compare_icon_template').html()),
        events: {'click .close' : 'removeThis','click .icon' : 'goToThis'},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        removeThis: function(){
            this.trigger('icon:remove', this.model);
        },
        goToThis: function(){
            this.trigger('icon:goTo', this.model);
        }

    });
    var CompareSectionView = Backbone.View.extend({
        className: 'compareSection',
        events: {'click button.compare' : 'doCompare'},
        initialize: function(){
            this.model.fetch();
        },
        addIcons: function(){
            this.model.each(function(place){
                var view = new CompareIconView({model:place});
                this.listenTo(view, 'icon:remove', this.remove);
                this.listenTo(view, 'icon:goTo', this.goTo);
                this.$el.append(view.render().el);
            }, this);
        },
        addCompareButton: function(){
            if(this.model.length>1){
                this.$el.append('<button class="compare center-block">Compare</button>');
            }
        },
        render: function(){
            this.$el.html('');
            this.$el.addClass(this.className);
            this.addIcons();
            this.addCompareButton();
            return this;
        },
        doCompare: function(){
            var view = new ComparisonPanelView( this.model.slice(0,2));
            $('body').append(view.render().el);
        },
        remove: function(place){
            this.trigger('section:remove', place);
        },
        goTo: function(place){
            this.trigger('section:goTo', place);
        }
    });
    var CompareView = Backbone.View.extend({
        el: '#compare',
        // events: {'icon:goTo': 'alert()'},
        initialize: function(options){
            this.compareModel = options.compareModel;
            this.firstrender();
            this.render();
        },
        firstrender: function(){
            this.$el.html('');
            this.children = [];
            _.each(this.compareModel.get('byType'),
                function(collection){
                    var e = $(document.createElement('div'));
                    this.$el.append(e);
                    var view = new CompareSectionView({model:collection,el:e});
                    this.listenTo(view, 'section:goTo', this.goTo);
                    this.listenTo(view, 'section:remove', this.remove);
                    this.children.push(view);
                }, this);
        },
        render: function(){
            _.each(this.children, function(c){c.render();});
        },
        goTo: function(place){
            this.trigger('goTo', place.get('id'));
        },
        remove: function(place){
            this.trigger('remove', place);
        },

    });
    return CompareView;
});