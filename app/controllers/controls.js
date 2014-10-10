import Ember from 'ember';

export default Ember.Controller.extend({
  speed: 100,

  danceDidChange: function () {
    var dance = this.get('dance');

    if( dance ) {
      this.socket.connection.emit('bot-start', {
        eventType: 'dance'
      });
    } else {
      this.socket.get('connection').emit('bot-stop', { origin: 'dance' });
    }
  }.observes('dance')
});
