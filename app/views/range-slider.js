import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: [ 'type', 'min', 'max', 'step', 'value', 'name' ],

  tagName: 'input',
  type:    'range',

  min:   0,
  max:   0,
  step:  1,
  value: 0,

  change: function ( event ) {
    this.set( 'value', event.target.value );
  }
});
