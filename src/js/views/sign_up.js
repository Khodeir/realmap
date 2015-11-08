/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone-modal',
], function ($, _, Backbone) {
    'use strict';

    var SignUpPanelView = Backbone.Modal.extend({
        template: '#signup-modal',
        cancelEl: '.bbm-button',
        serializeData: function(){
            return this.model;
        }
    });

    return SignUpPanelView;
});