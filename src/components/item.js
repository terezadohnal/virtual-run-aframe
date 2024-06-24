AFRAME.registerComponent('item', {
  schema: {
    src: { type: 'string', default: '' },
  },
  init: function () {
    console.log('Item component initialized');
  },
});
