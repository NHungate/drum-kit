const SOUNDS_PATH = './sounds';

const keysData = [{
  keycode: 65,
  key: 'a',
  soundName: 'boom',
  file: `${SOUNDS_PATH}/boom.wav`
},
{
  keycode: 83,
  key: 's',
  soundName: 'clap',
  file: `${SOUNDS_PATH}/clap.wav`
},
{
  keycode: 68,
  key: 'd',
  soundName: 'hi-hat',
  file: `${SOUNDS_PATH}/hihat.wav`
},
{
  keycode: 70,
  key: 'f',
  soundName: 'kick',
  file: `${SOUNDS_PATH}/kick.wav`
},
{
  keycode: 71,
  key: 'g',
  soundName: 'open hat',
  file: `${SOUNDS_PATH}/openhat.wav`
},
{
  keycode: 72,
  key: 'h',
  soundName: 'ride',
  file: `${SOUNDS_PATH}/ride.wav`
},
{
  keycode: 74,
  key: 'j',
  soundName: 'snare',
  file: `${SOUNDS_PATH}/snare.wav`
},
{
  keycode: 75,
  key: 'k',
  soundName: 'tink',
  file: `${SOUNDS_PATH}/tink.wav`
},
{
  keycode: 76,
  key: 'l',
  soundName: 'tom',
  file: `${SOUNDS_PATH}/tom.wav`
}];

function buildKeyElement( keyData ) {
  // Key elements to be inserted into DOM
  const keyDataAttr = document.createAttribute('data-key');
  keyDataAttr.value = keyData.keycode;

  // Container
  const keyContainer = document.createElement('div');
  keyContainer.className = 'key';
  keyContainer.setAttributeNode( keyDataAttr );

  // Kbd element describing what key will be triggered
  const keyDescription = document.createElement('kbd');
  const keyName = document.createTextNode(keyData.key);
  keyDescription.appendChild(keyName);
  keyContainer.appendChild(keyDescription);

  // Subtext describing what sound will be played
  const soundDescription = document.createElement('span');
  soundDescription.className = 'sound';

  const soundName = document.createTextNode(keyData.soundName);
  soundDescription.appendChild(soundName);
  keyContainer.appendChild(soundDescription);

  // Appending to keys div
  const keysContainer = document.getElementsByClassName('keys')[0];
  keysContainer.appendChild(keyContainer);
}

function buildAudioElement( keyData ) {
  // Creating audio element to play
  const audio = document.createElement('audio');

  const keyDataAttr = document.createAttribute('data-key');
  keyDataAttr.value = keyData.keycode;
  audio.setAttributeNode( keyDataAttr );

  const audioSrc = document.createAttribute('src');
  audioSrc.value = keyData.file;
  audio.setAttributeNode(audioSrc);

  document.body.appendChild(audio);
}

function buildKey( keyData ) {
  buildKeyElement( keyData );
  buildAudioElement( keyData );
}

for (let i = 0; i < keysData.length; i++) {
  buildKey( keysData[i] );
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) { return; }

  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') { return; }

  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition)
});

window.addEventListener('keydown', playSound);
