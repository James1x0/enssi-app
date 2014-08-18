import Socket from '../globals/socket';

export default {
  name: 'register-socket',

  initialize: function( container ) {
    container.register('globals:socket', Socket.extend(), { singleton: true });
  }
};
