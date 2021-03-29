// 1. GET A RANDOM IMAGE AND DISPLAY IT
getRandomImage();

// 2. VALIDATE THE USER'S EMAIL ADDRESS
const validateEmail = createValidator();

let validationResult;

document.querySelector('.email--button').addEventListener('click', () => {
    validationResult = validateEmail();

    if (validationResult && validationResult !== 'empty') {
      document.querySelector('.image--attach-button').classList.remove('button-inactive');
    }
});

// 3. ATTCH A NEW IMAGE TO THE GALLERY OF SELECTED ITEMS
// Attaches only if a valid email has been linked
const attachButton = document.querySelector('.image--attach-button');

attachButton.addEventListener('click', () => {
    if (validationResult === 'empty' || !validationResult) {
    } else {
        const gallery = document.querySelector('.gallery');
        addGalleryItem();
    }
});


// 3.

class UserImages {
    constructor(email, allImages) {
        this.userEmail = email;
        this.chosenImages = new Array();
    }
}


/*
On click email link
  If email is valid
    If no email currently stored
      Create instance
      Add current email to cookies
    Else if no
    If email not different to currently stored

*/

/*
===== PLAN =====
1. On email not assigned, clicking 'attach' should prompt the user to assign an email address
2. On email assigned, create a user instance
3. On clicking 'attach', first check image ID is not in instance's chosenImages.
  3.1. If not, add to gallery, and add to chosenImages
  3.2. If is, do nothing? (make gallery item prompt perhaps)
4. On clicking 'remove', remove from the instance's chosenImages as well as from the gallery
5. If user instance is created already:
  5.1. If error in address, do nothing
  5.2. If a valid address:
    5.2.1. If is same address, do nothing
    5.2.2. If different address, alert/prompt that this will lose selected images
      5.2.2.1. If OK, remove all images from gallery and create new empty instance, proceed with displaying new email address
      5.5.5.2. Else do nothing

===== ADDITIONAL CONSIDERATIONS =====
- Store the user instance as a cookie? On load, if the user cookie exists 1) populate the gallery, 2) set "using <email>", and 3) set validity to the user's address
- Store individual user instances as cookies, to access previously selected image selections?
*/
