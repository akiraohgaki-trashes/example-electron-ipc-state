const spanElement = document.createElement('span');
document.body.append(spanElement);

// span 要素クリックすると
// window.api.state() を使ってステート更新
spanElement.addEventListener('click', () => {
  window.api.state({ time: new Date().toISOString() });
});

// window.api.on() で監視しておくから更新されたら教えてね
window.api.on('stateChanged', (state) => {
  spanElement.textContent = state.time;
});
