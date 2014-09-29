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

    socket.on('users-update',   this._updateUsers.bind( this ));
    socket.on('username-taken', this._usernameTaken.bind( this ));
    socket.on('queue-update',   this._updateQueue.bind( this ));

    socket.on('error', function (err) {
      console.error(err);
      throw err;
    });
  },

  _updateUsers: function ( data ) {
    this.set('users', data);
  },

  _updateQueue: function ( data ) {
    this.setProperties({
      nextUser: data.next,
      currentUser: data.current
    });
  },

  _usernameTaken: function () {
    this.controllerFor('join').set('loginError', 'Username is already in use.');
    this.transitionToRoute('join');
  },

  isCurrentUser: function () {
    return this.get('currentUser.name') === this.get('username');
  }.property('currentUser'),

  isNextUser: function () {
    return this.get('nextUser.name') === this.get('username');
  }.property('nextUser')

});
