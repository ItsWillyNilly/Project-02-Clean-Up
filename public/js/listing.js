$(document).ready(function () {
    const user = $.get('/api/user_data').then(function (data) {
        return data;
    });

    // Get a reference to the "Create New Listing" element
    const createListingBtn = document.getElementById('create-listing-btn');
    const newListingForm = document.getElementById('new-listing-form');

    // Add an event listener to the form's submit event
    newListingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the form data
        const formData = new FormData(newListingForm);

        // Check if all required fields are filled out
        const requiredFields = ['title', 'type', 'description', 'price', 'condition']; // Replace with your actual required field names
        const allFieldsFilled = requiredFields.every(field => formData.get(field));

        // Perform validation
        if (allFieldsFilled) {
            // If all required fields are filled out, submit the form data
            submitNewListing(formData);
        } else {
            // If some required fields are missing, display an error message
            displayErrorMessage('Please fill out all required fields.');
        }
    });

    // Function to submit the new listing
    function submitNewListing(formData) {
        // Send an AJAX request to the server
        fetch('/submit-listing', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful submission
                    console.log('New listing submitted successfully!');
                    // Optionally, you can redirect the user or perform additional actions
                    window.location.href = '/listings';
                } else {
                    // Handle error response
                    console.error('Error submitting new listing:', response.status);
                }
            })
            .catch(error => {
                console.error('Error submitting new listing:', error);
            });
    }

    // Add a click event listener
    createListingBtn.addEventListener('click', () => {
        // Redirect to the new listing page
        window.location.href = '/new-post';
    });

    function displayErrorMessage(message) {
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = message;
    }
});
