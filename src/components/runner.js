AFRAME.registerComponent('runner', {
  init() {
    console.log('Runner component initialized');

    // Reference to the character model
    this.characterModel = this.el;

    // Set initial position
    this.characterModel.setAttribute('position', { x: 0, y: 0.2, z: -2 });

    // Listen for keydown events to start running
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyV') {
        this.startRunning('left');
      } else if (event.code === 'KeyB') {
        this.startRunning('right');
      }
    });
  },

  startRunning(direction) {
    // Get current position
    const position = this.characterModel.getAttribute('position');

    // Update position based on direction
    if (direction === 'left') {
      position.x -= 1;
    } else if (direction === 'right') {
      position.x += 1;
    }

    // Set the new position
    this.characterModel.setAttribute('position', position);
  },
});
