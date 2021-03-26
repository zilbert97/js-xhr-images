const buttons = document.getElementsByClassName('gallery--item-remove');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {

    let wrapper = e.target.parentNode.parentNode;
    wrapper.parentNode.removeChild(wrapper);
  });
}


//

createValidator();





//

class UserImages {

  constructor(email, allImages) {
    this.userEmail = email;
    this.chosenImages = new Array();
    this.allImages = allImages;
  }

  randomImageObject() {
    // Random number between 0 and 99 (or number of images in pool -1)
    const randomInteger = Math.floor(Math.random() * (this.allImages.length - 1));
    return this.allImages[randomInteger];
  }
}




axios.get(
  `https://picsum.photos/v2/list?limit=100`
).then((response) => {
  const attachButton = document.querySelector('.image--attach-button');
  const resetButton = document.querySelector('.image--reset-button');

  document.querySelector('.email--button').addEventListener(
    'click', () => {
      //attachButton.removeEventListener('click', imagePicker);
      //resetButton.removeEventListener('click', imagePicker);

      const newUser = new UserImages('me@me.com', response.data);

      const attachButton = document.querySelector('.image--attach-button');
      const refreshButton = document.querySelector('.image--reset-button');

      refreshButton.addEventListener('click', () => {
        const imagePreview = document.querySelector('.image');
        const currentImageObject = newUser.randomImageObject();
        imagePreview.src = currentImageObject.download_url;
      });

    }
  )
}).then((response) => {
}).catch((error) => {
  console.error(error);
}).finally(() => {
});





/*
  Check the user email address
  If a new email address (not in array), create new instance of class
  For that instance, store an object of all 100 random images
  Declare an empty variable chosenImages
  On button click pick random number
  Display the image by accessing index


*/
