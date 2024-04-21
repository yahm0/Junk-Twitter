document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form'); // Assuming there's only one form on the page

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Grab the data from the form using the specific IDs
        const userData = {
            username: document.getElementById('name-signup').value, // Ensure the ID matches your HTML
            email: document.getElementById('email-signup').value,
            password: document.getElementById('password-signup').value,
        };

        // Make an AJAX request to your server's signup endpoint
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming your server responds with JSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log(data);
            if (data.success) {
                // Redirect to homepage upon successful signup and automatic login
                window.location.href = '/homepage';
            } else {
                // Optionally handle errors or display messages
                displayErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            displayErrorMessage('An error occurred during signup. Please try again later.');
        });
    });

    function displayErrorMessage(message) {
        const messageElement = document.getElementById('signupErrorMessage');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block'; // Ensure there's an element with id 'signupErrorMessage'
        }
    }
});
