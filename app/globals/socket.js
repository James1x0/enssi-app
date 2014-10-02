/*
  Socket Controller
*/

import Ember from 'ember';
import growlMixin from '../mixins/growl';

export default Ember.Object.extend(growlMixin, {
  connected: false,
  connection: null,
  messages: Ember.A(),

  connect: function ( callback ) {
    var socket = io.connect('192.168.2.10:3000');

    this.set('connection', socket);

    var self = this;

    socket.on('connect', function ( /* data */ ) {
      self.set('connected', true);

      self.growl('success', 'Connection Success', 'Successfully connected to socket server.', 3000, 'fa fa-plug');

      console.debug("Socket Connected");

      if( callback && typeof callback === 'function' ) {
        callback();
      }
    });

    socket.on('users-update',   this._updateUsers.bind( this ));
    socket.on('username-taken', this._usernameTaken.bind( this ));
    socket.on('queue-update',   this._updateQueue.bind( this ));
    socket.on('new-message',    this._newMessage.bind( this ));

    socket.on('connect_timeout', function ( err ) {
      self.growl('danger', 'Socket Timeout', 'Socket connection timed out.');
      console.error(err);
      callback();
    });

    socket.on('connect_error', function ( err ) {
      self.growl('danger', 'Socket Error', err);
      console.error( err );
      callback();
    });

    socket.on('error', function ( err ) {
      self.growl('danger', 'Socket Error', err);
      console.error( err );
      callback();
    });

    socket.on('disconnect', function () {
      console.log('disconnected');
      self.setProperties({
        username: null,
        connected: false
      });
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

  _newMessage: function ( data ) {
    this.get('messages').pushObject( data );
  },

  isCurrentUser: function () {
    return this.get('currentUser.name') === this.get('username');
  }.property('currentUser'),

  isNextUser: function () {
    return this.get('nextUser.name') === this.get('username');
  }.property('nextUser')

});
