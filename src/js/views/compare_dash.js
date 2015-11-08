/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/comparison_panel',
    'views/sign_up'
], function ($, _, Backbone, ComparisonPanelView, SignUpPanelView) {
    'use strict';

    var CompareIconView = Backbone.View.extend({
        template: _.template($('#compare_icon_template').html()),
        events: {'click .close' : 'removeThis','click .icon' : 'goToThis'},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        removeThis: function(){
            this.model.destroy();
        },
        goToThis: function(){
            this.trigger('goToThis', this.model.get('id'));
        }

    });
    var CompareSectionView = Backbone.View.extend({
        className: 'compareSection',
        events: {'click button.compare' : 'doCompare'},
        initialize: function(){
            this.model.on('add', this.render, this);
            this.model.on('remove', this.render, this);
            this.model.on('reset', this.render, this);
            this.model.fetch();
        },
        addIcons: function(){
            this.model.each(function(place){
                var view = new CompareIconView({model:place});
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
        }
    });
    var CompareView = Backbone.View.extend({
        el: '#compare',
        initialize: function(){
            this.render();
        },     
        render: function(){
            this.$el.html('');
            _.each(this.model,function(collection){
                var e = $(document.createElement('div'));
                this.$el.append(e);
                new CompareSectionView({model:collection,el:e});
            }, this);
        },
        addPlace: function(h){
            var type = h.get('type');
            var list = this.model[type];
            if(list){
                if(list.length<list.maxLength){
                    list.create(h.toJSON()); 
                }
                else{
                    var context = {message: 'Sign up to be able to add more than two places!'};
                    var view = new SignUpPanelView({model:context});
                    $('body').append(view.render().el);
                }
            
            }
        }
    });
    return CompareView;
});