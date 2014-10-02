import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'button',
  classNames: [ 'btn', 'btn-default' ],
  attributeBindings: [ 'title' ],

  speed: 100,

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

    var dir   = this.get('eventDirection'),
        deg   = this.get('eventDegrees'),
        spd   = this.get('speed'),
        ratio = this.get('ratio');

    ev.speed = spd || 100;

    if( dir ) {
      ev.eventDirection = dir;
    }

    if( deg ) {
      ev.eventDegrees = deg;
    }

    if( ratio ) {
      ev.ratio = parseFloat( ratio );
    }

    this.socket.connection.emit('bot-start', ev);
  }
});
