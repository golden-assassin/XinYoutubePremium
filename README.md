# Youtube-picture-in-picture
```js
const player = document.querySelector(".html5-main-video");
function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    player.requestPictureInPicture();
  }
};

const parent = document.querySelector(".ytd-watch-metadata");
var button = document.createElement('button');
button.innerHTML = 'picture in picture';
button.style.cssText = `
  background-color: rgb(42,42,42);
  color: white;
  border-radius: 100vh;
  border: 0px;
  padding: 5px;
  margin: 5px;
`;
button.addEventListener('click', togglePictureInPicture);
parent.appendChild(button);
```
