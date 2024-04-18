document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Send a POST request to the server to log out
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/login'; // Redirect to the login page on successful logout
                } else {
                    throw new Error('Failed to log out');
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
                alert('Logout failed, please try again.');
            });
        });
    }
});
