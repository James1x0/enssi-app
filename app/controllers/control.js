import Ember from 'ember';

export default Ember.Controller.extend({
  connectionChanged: function () {
    if( this.socket.get('connected') !== true && !this.socket.get('username') ) {
      this.transitionToRoute('join');
    }
  }.observes('this.socket.connected')
});
