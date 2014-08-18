export default {
  name: 'socket',
  after: 'register-socket',

  initialize: function ( container, app ) {
    app.deferReadiness();

    var socketController = container.lookup('globals:socket');

    socketController.connect(function () {
      container.typeInjection('controller', 'socket', 'globals:socket');
      container.typeInjection('route', 'socket', 'globals:socket');
      container.typeInjection('component', 'socket', 'globals:socket');
      container.typeInjection('view', 'socket', 'globals:socket');

      app.advanceReadiness();
    });

  }
};
