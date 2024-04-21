document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/homepage'; // Redirect to homepage on success
            } else {
                displayErrorMessage(data.message || 'Login failed, please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            displayErrorMessage('An error occurred, please try again later.');
        });
    });

    function displayErrorMessage(message) {
        const messageElement = document.querySelector('#loginErrorMessage');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.display = 'block';
        }
    }
});
