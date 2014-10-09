import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function ( transition ) {
    if( !this.socket.get('username') || this.socket.get('connected') !== true || !this.socket.get('connectedWithUsername') ) {
      this.controllerFor('join').set('previousTransition', transition);
      this.transitionTo('join');
    }
  }
});
