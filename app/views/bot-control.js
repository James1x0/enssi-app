import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'button',

  mouseUp: function () {
    if( this.get('noStop') === true ) {
      return;
    }

    this.socket.get('connection').emit('bot-stop', { origin: this.get('eventType') });
  },

  mouseDown: function () {
    var ev = {
      eventType: this.get('eventType')
    };

    var dir = this.get('eventDirection'),
        deg = this.get('eventDegrees');

    if( dir ) {
      ev.eventDirection = dir;
    }

    if( deg ) {
      ev.eventDegrees   = deg;
    }

    this.socket.connection.emit('bot-start', ev);
  }
});
