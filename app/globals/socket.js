/*
  Socket Controller
*/

import Ember from 'ember';

export default Ember.Object.extend({
  connected: false,
  connection: null,

  connect: function ( callback ) {
    var socket = io.connect('192.168.2.10:3000');

    this.set('connection', socket);

    var self = this;

    socket.on('connect', function ( /* data */ ) {
      self.set('connected', true);

      console.debug("Socket Connected");

      if( callback && typeof callback === 'function' ) {
        callback();
      }
    });

    var updateUsers = this._updateUsers.bind( this );

    socket.on('users-update', updateUsers);

    socket.on('error', function (err) {
      console.error(err);
      throw err;
    });
  },

  _updateUsers: function ( data ) {
    this.set('users', data);
  }

});
