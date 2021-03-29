// 1. GET A RANDOM IMAGE AND DISPLAY IT
getRandomImage();



let validationResult;

// 3.

class UserImages {
    constructor() {
        this.userEmail = null;
        this.chosenImages = new Array();

        this.init = function() {
            const emailButton = document.querySelector('.email--button');
            const attachButton = document.querySelector('.image--attach-button');

            // 2. VALIDATE THE USER'S EMAIL ADDRESS
            const validateEmail = createValidator();

            const displayNewUser = emailAddress => {
                const responseMessage = document.querySelector('.email--validation-copy');
                responseMessage.style.color = '#25BD38';
                responseMessage.innerHTML = `Using ${emailAddress}`;
            }

            emailButton.addEventListener('click', () => {
                validationResult = validateEmail();

                // If a valid email is returned
                if (validationResult && validationResult !== 'empty') {

                    // Make attach button appear as active
                    document.querySelector('.image--attach-button').classList.remove('button-inactive');

                    // If first user email passed (none stored previously)
                    if (!this.userEmail) {
                        // Store the new user email in the instance
                        this.userEmail = validationResult;
                        displayNewUser(this.userEmail);
                    }
                    // Else if a user email is already stored and is not the
                    // same as the email passed, AND images in gallery
                    else if (validationResult !== this.userEmail && this.chosenImages.length > 0) {
                        const changeUser = confirm(`A new email has been passed, and you'll lose any saved images. Are you sure you want to continue?`);
                        // If confirmed to change user
                        if (changeUser) {
                            // Set the new user email
                            this.userEmail = validationResult;
                            displayNewUser(this.userEmail);

                            // Remove saved images from array
                            this.chosenImages = [];

                            // Empty the gallery
                            let allGalleryItems = document.getElementsByClassName('gallery--item');
                            while (allGalleryItems[0]) {
                                allGalleryItems[0].parentNode.removeChild(allGalleryItems[0]);
                            }
                        }
                    }
                    // Else if user email is already stored but no images in gallery, change user
                    else {
                        this.userEmail = validationResult;
                        displayNewUser(this.userEmail);
                    }
                }
            });

            attachButton.addEventListener('click', () => {
                // If validation is not empty and is a valid email
                if (validationResult && validationResult !== 'empty') {
                    this.addGalleryItem();
                }
            });

        }

        this.init();
    }

    addGalleryItem() {
        const currentImageURL = document.cookie.split('; ').find(row => row.startsWith('currentImage_download_url=')).split('=')[1];
        const currentImageID = document.cookie.split('; ').find(row => row.startsWith('currentImage_id=')).split('=')[1];
        const gallery = document.querySelector('.gallery');
        const newGalleryItem = document.createElement('figure');
        newGalleryItem.classList.add('gallery--item');
        newGalleryItem.innerHTML = `
            <div class="gallery--img-wrapper">
                <img src="${currentImageURL}" class="gallery--img fade-in" />
            </div>
            <div class="gallery--item-remove">
                <i class="fas fa-times"></i>
            </div>`;

        // Insert into the gallery (before the final spacer element)
        gallery.insertBefore(newGalleryItem, document.querySelector('.gallery--item-spacer'));

        // Add to stored images
        this.chosenImages.push(currentImageID);

        const newGalleryItemRemove = newGalleryItem.querySelector('.gallery--item-remove');

        // Add an event listener for the image's remove button, to remove it from the gallery
        newGalleryItemRemove.addEventListener('click', (e) => {
            let wrapper = e.target.parentNode.parentNode;
            wrapper.parentNode.removeChild(wrapper);

            // Remove from this.chosenImages
            const index = this.chosenImages.indexOf(currentImageID);
            this.chosenImages.splice(index, 1);
        });
    }
}

const newUser = new UserImages();






// 3. ATTCH A NEW IMAGE TO THE GALLERY OF SELECTED ITEMS
// Attaches only if a valid email has been linked


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
