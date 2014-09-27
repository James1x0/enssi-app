import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EnssiAppENV.locationType
});

Router.map(function() {
  this.route('join');
  this.route('control');
});

export default Router;
