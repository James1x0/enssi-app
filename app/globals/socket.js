/*
  Socket Controller
*/

import Ember from 'ember';
import growlMixin from '../mixins/growl';

export default Ember.Object.extend(growlMixin, {
  needs: ['join'],
  connected: false,
  connectedWithUsername: false,
  connection: null,
  messages: Ember.A(),

  connect: function ( callback ) {
    var socket = io.connect('192.168.2.9:3000');

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
    socket.on('username-success', function ( data ) {
      self.set('connectedWithUsername', true);
    });

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
        connectedWithUsername: false,
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
    this.set('loginError', 'Username or IP is already in use.');
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
