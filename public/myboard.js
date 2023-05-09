const year = new Date().getFullYear();
document.getElementById("current-year").textContent = year;
const colors = ["#ec2128", "#f35928", "#fcb03a", "#009348", "#21abe3"];

const moodImgs = document.querySelectorAll('#moodRow img');
let selectedimg;

moodImgs.forEach(img => {
  img.addEventListener('click', function() {
    moodImgs.forEach(img => {
      img.classList.remove('img-large');
    });
    this.classList.add('img-large');
    selectedimg = img;
    console.log(selectedimg.id);
  });
});

const reasons = document.querySelectorAll('.reason-option');
let selectedReason;

reasons.forEach(reason => {
    reason.addEventListener('click', function() {
        reasons.forEach(reason => {
            reason.classList.remove('selected-reason');
        });
        this.classList.add('selected-reason');
        selectedReason = reason;
        console.log(selectedReason);
    });
});

let content;
let text = document.getElementById('text-button');
let video = document.getElementById('video-button');
let container = document.getElementById('day-description');

video.addEventListener('click', function() {
  video.classList.remove('btn-outline-primary');
  text.classList.remove('btn-primary');
  video.classList.add('btn-primary');
  text.classList.add('btn-outline-primary');

  container.innerHTML = '<div class="row">  <div class="col" style="display: flex; justify-content: center; align-items: center;">  <button id="start-recording-button" class="btn btn-primary" >Start Recording</button>  </div></div><div class="row">  <div class="col" style="display: flex; justify-content: center; align-items: center;">  <video id="video-player" style="display: none"></video>  </div></div><div class="row">  <div class="col" style="display: flex; justify-content: center; align-items: center;">  <button id="stop-recording-button" class="btn btn-primary" style="display: none">Stop Recording</button>  </div></div>';
  const startRecordingButton = document.getElementById('start-recording-button');
  startRecordingButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      startRecordingButton.style.display = 'none';
      const videoElement = document.getElementById('video-player');
      videoElement.style.display = 'block';
      videoElement.style.width = '200px';
      videoElement.srcObject = stream;
      videoElement.play();

      mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const videoBlob = new Blob(chunks, {type: 'video/webm'});
        const videoUrl = URL.createObjectURL(videoBlob);
        const formData = new FormData();
        formData.append('video', videoBlob, 'video.webm');

        fetch('/save-video', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server if needed
          console.log(data);
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });

      });

      mediaRecorder.start();

      const stopRecordingButton = document.getElementById('stop-recording-button');
      stopRecordingButton.style.removeProperty('display');
      stopRecordingButton.addEventListener('click', () => {
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => {
              track.stop();
          });
          container.innerHTML = '<div class="row">  <div class="col" style="display: flex; justify-content: center; align-items: center;">  <button id="start-recording-button" class="btn btn-primary" >Start Recording</button>  </div></div>'
      });
    });
  });
});

text.addEventListener('click', function() {
  text.classList.remove('btn-outline-primary');
  video.classList.remove('btn-primary');
  text.classList.add('btn-primary');
  video.classList.add('btn-outline-primary');

  container.innerHTML = '<textarea id="text-box"></textarea>';
  content = document.getElementById('text-box').value;
});

const addTileButton = document.getElementById('add-tile');
addTileButton.addEventListener('click', function() {
  let bgcolor;
  let val;
  switch(selectedimg.id) {
    case "mood1":
      bgcolor = colors[0];
      val = Math.floor(Math.random() * (3));
      break;
    case "mood2":
      bgcolor = colors[1];
      val = Math.floor(Math.random() * (2)) + 3;
      break;
    case "mood3":
      bgcolor = colors[2];
      val = Math.floor(Math.random() * (2)) + 5;
      break;
    case "mood4":
      bgcolor = colors[3];
      val = Math.floor(Math.random() * (2)) + 7;
      break;
    case "mood5":
      bgcolor = colors[4];
      val = Math.floor(Math.random() * (2)) + 99;
      break;
  }
  document.querySelector('.modal-backdrop').remove();
  const tile = document.createElement('div');
  tile.style.backgroundColor = bgcolor;
  tile.textContent = val;
  tile.classList.add('mood-tile');
  const tileRow = document.getElementById('tileRow');
  tileRow.appendChild(tile);
});

const tiles = document.querySelectorAll('.mood-tile');
tiles.forEach(tile => {
  const value = tile.textContent;
  let bg;
  if(value <= 2) {
    bg = colors[0];
  } else if(value < 5) {
    bg = colors[1];
  } else if(value < 7) {
    bg = colors[2];
  } else if(value < 9) {
    bg = colors[3];
  } else {
    bg = colors[4];
  }

  tile.style.backgroundColor = bg;
})









