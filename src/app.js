// REMOVE GALLERY ITEM

const buttons = document.getElementsByClassName('gallery--item-remove');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {

    let wrapper = e.target.parentNode.parentNode;
    wrapper.parentNode.removeChild(wrapper);
  });
}


// APP.JS STUFF

createValidator();



const createImageCookies = (currentImageObject) => {

  for (let i = 0; i < Object.keys(currentImageObject).length; i++) {
    const currentKey = Object.keys(currentImageObject)[i];
    document.cookie = `currentImage_${currentKey}=${currentImageObject[currentKey]}`;
  }
}



const createRandom = () => {
  const randomIndex = max => Math.floor(Math.random() * max);
  const getRandomImageObject = allImageObjects => allImageObjects[
    randomIndex(allImageObjects.length - 1)
  ];

  const imagePreview = document.querySelector('.image');
  const resetButton = document.querySelector('.image--reset-button');

  axios.get(
    `https://picsum.photos/v2/list?limit=100`
  ).then((response) => {
    let currentImageObject = getRandomImageObject(response.data);
    imagePreview.src = currentImageObject.download_url;

    createImageCookies(currentImageObject);

    resetButton.addEventListener('click', () => {
      currentImageObject = getRandomImageObject(response.data);
      imagePreview.src = currentImageObject.download_url;
      createImageCookies(currentImageObject);
    });




  }).catch((error) => {
    console.error(error);
  }).finally(() => {
  });

}

createRandom();


//

class UserImages {

  constructor(email, allImages) {
    this.userEmail = email;
    this.chosenImages = new Array();
    this.allImages = allImages;
  }
}





const attachButton = document.querySelector('.image--attach-button');

document.querySelector('.email--button').addEventListener('click', () => {});





/*
  Check the user email address
  If a new email address (not in array), create new instance of class
  For that instance, store an object of all 100 random images
  Declare an empty variable chosenImages
  On button click pick random number
  Display the image by accessing index
*/
