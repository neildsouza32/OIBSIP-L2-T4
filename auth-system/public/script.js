document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const accessSecuredButton = document.getElementById('access-secured');
    const securedMessage = document.getElementById('secured-message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            registerForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert(data.message);
                loginForm.reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    accessSecuredButton.addEventListener('click', function() {
        const token = localStorage.getItem('token');
        
        fetch('/secured', {
            headers: {
                'Authorization': token,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                securedMessage.textContent = data.message + ', ' + data.username;
            } else {
                securedMessage.textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
