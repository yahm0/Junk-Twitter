document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form'); // Assuming there's only one form on the page

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Grab the data from the form using the specific IDs
        const userData = {
            username: document.getElementById('name-signup').value, // Changed from 'name' to 'username'
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
                // Redirect to login or another page on success
                window.location.href = '/login';
            } else {
                // Optionally handle errors or display messages
                alert(data.message || 'Something went wrong.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});