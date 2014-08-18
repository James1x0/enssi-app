/*
  Socket Controller
*/

import Ember from 'ember';

export default Ember.Object.extend({
  connected: false,
  connection: null,

  connect: function ( callback ) {
    var socket = io.connect('http://localhost:3000');

    this.set('connection', socket);

    var self = this;

    socket.on('connect', function ( data ) {
      self.set('connected', true);

      console.debug("Socket Connected");

      if( callback && typeof callback === 'function' ) {
        callback();
      }
    });
  }

});
