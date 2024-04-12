document.addEventListener('DOMContentLoaded', function () {
    // Since there's no specific ID, ensure you're targeting the right form, especially if there are multiple forms on the page.
    const loginForm = document.querySelector('form'); // More specific selector recommended if possible

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Grab the data from the input fields
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;

        // Construct the data object to send
        const loginData = {
            email,
            password,
        };

        // Make an AJAX request to your server's login endpoint
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json(); // or .text() if you're not sending JSON response
        })
        .then(data => {
            // Handle success, such as redirecting to the homepage or showing a success message
            window.location.href = '/homepage'; // Redirect to homepage on successful login
        })
        .catch(error => {
            console.error('Error during login:', error);
            // Optionally, display an error message on the login form
        });
    });
});