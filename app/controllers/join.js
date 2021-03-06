import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  init: function () {
    this._super();

    var r = rand;

    var genRandom = function ( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1 ) + min );
    };

    var username = r.adjectives[ genRandom( 0, r.adjectives.length - 1 ) ] + r.nouns[ genRandom( 0, r.nouns.length - 1 ) ] + genRandom( 100, 200 );

    this.set('username', username);
  },

  loginError: function () {
    return this.socket.get('loginError');
  }.property('socket.loginError'),

  connectedWithUser: function () {
    var socket = this.socket;

    if( socket.get('connected') && socket.get('connectedWithUsername') ) {
      if( this.get('previousTransition') ) {
        this.get('previousTransition').retry();
      } else {
        this.transitionToRoute('control');
      }
    }
  }.observes('socket.connected', 'socket.connectedWithUsername'),

  allowSubmit: function () {
    var u = this.get('username');

    return ( u && u.length > 1 && this.socket.get('connected') );
  }.property('username', 'socket.connected'),

  actions: {
    submitUsername: function () {
      this.set('loginError', null);

      var username = this.get('username');

      this.socket.set('loginError', null);

      this.socket.connection.emit('username', username);

      this.socket.set('username', username);
    }
  }
});

var rand = {
  adjectives: [
    'Pirate', 'Homeless', 'Crazy', 'Lazy', 'Insane', 'Golden', 'Jittery', 'Technical', 'Happy', 'Damaging', 'Defeated', 'Conscious', 'Intelligent', 'Concerned', 'Seemly', 'Parsimonious', 'Large', 'Poised', 'Previous', 'Unused', 'Succinct', 'Woozy', 'Astonishing', 'Dazzling', 'Delightful', 'Various', 'Whispering', 'Huge', 'Flippant', 'Married', 'Nappy', 'Exclusive', 'Motionless', 'Rightful', 'Madly', 'Lavish', 'Obtainable', 'Crowded', 'Dangerous'
  ],
  nouns: [
    'Skipper', 'Monkey', 'Dude', 'Cupcake', 'Muffin', 'Steak', 'Keyboard', 'Tomster', 'Ember', 'Voice', 'Smile', 'Sweater', 'Rabbit', 'Book', 'Eggs', 'Pear', 'Chicken', 'Scent', 'Seat', 'Skate', 'Jam', 'Pan', 'Tiger', 'String', 'Crib'
  ]
};
