class UserImages {
    constructor() {
        this.userEmail = null;
        this.chosenImages = new Array();

        this.init = function() {
            const emailButton = document.querySelector('.email--button');
            const attachButton = document.querySelector('.image--attach-button');

            // VALIDATE THE USER'S EMAIL ADDRESS
            const validateEmail = createValidator();
            let validationResult;

            emailButton.addEventListener('click', () => {
                validationResult = validateEmail();

                // If a valid email is returned
                if (validationResult && validationResult !== 'empty') {

                    // Make attach button appear as active
                    document.querySelector('.image--attach-button').classList.remove('button-inactive');

                    // If first user email passed (none stored previously)
                    if (!this.userEmail) {
                        // Store the new user email in the instance
                        this.updateUserEmail(validationResult);
                    }
                    // Else if a user email is already stored and is not the
                    // same as the email passed, AND images are in gallery
                    else if (validationResult.toUpperCase() !== this.userEmail.toUpperCase() && this.chosenImages.length > 0) {
                        const changeUser = confirm(`Your images are currently linked to ${this.userEmail} - if you pass a new email address you'll lose any saved images. Are you sure you want to continue?`);
                        // If confirmed to change user
                        if (changeUser) this.resetGallery(validationResult);
                    }
                    // Else if user email is already stored but no images in gallery, change user
                    else {
                        this.updateUserEmail(validationResult);
                    }
                }
            });

            attachButton.addEventListener('click', () => {
                // If validation is not empty and is a valid email
                if (this.userEmail) this.addGalleryItem();
            });
        }

        this.init();
    }

    addGalleryItem() {
        const currentImageID = document.cookie.split('; ').find(row => row.startsWith('currentImage_id=')).split('=')[1];

        if (!(this.chosenImages.indexOf(currentImageID) >= 0)) {
            const currentImageURL = document.cookie.split('; ').find(row => row.startsWith('currentImage_download_url=')).split('=')[1];
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
                console.log(e.target.parentNode.parentNode);
                let wrapper = e.target.parentNode.parentNode;
                wrapper.parentNode.removeChild(wrapper);

                // Remove from this.chosenImages
                const index = this.chosenImages.indexOf(currentImageID);
                this.chosenImages.splice(index, 1);
            });
        }
    }

    resetGallery(emailAddress) {
        // Set the new user email
        this.updateUserEmail(emailAddress);

        // Remove saved images from array
        this.chosenImages = [];

        // Empty the gallery
        let allGalleryItems = document.getElementsByClassName('gallery--item');

        for (let i = 0; i < allGalleryItems.length; i++) {
            allGalleryItems[i].classList.toggle('fade-out');
        }
        setTimeout(() => {
            for (let i = allGalleryItems.length - 1; i >= 0; i--) {
                allGalleryItems[i].parentNode.removeChild(allGalleryItems[i]);
            }
        }, 300);
    }

    updateUserEmail(emailAddress) {
        this.userEmail = emailAddress;

        const responseMessage = document.querySelector('.email--validation-copy');
        responseMessage.style.color = '#fefefe';
        responseMessage.innerHTML = `Attaching to ${emailAddress.toLowerCase()}`;
    }
}
