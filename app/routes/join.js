import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if( this.socket.get('username') ) {
      return this.transitionTo('control');
    }
  }
});
