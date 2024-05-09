document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const longURLInput = document.getElementById('longURL');
    const shortenedURLContainer = document.getElementById('shortenedURL');

    urlForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const longURL = longURLInput.value.trim();

        if (longURL !== '') {
            shortenURL(longURL);
        } else {
            alert('Please enter a valid URL');
        }
    });

    function shortenURL(longURL) {
        fetch('http://localhost:3000/shorten', { // Using localhost address
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longURL: longURL })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }
            return response.json();
        })
        .then(data => {
            const shortenedURL = data.shortenedURL;
            displayShortenedURL(shortenedURL);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while shortening the URL');
        });
    }

    function displayShortenedURL(shortenedURL) {
        shortenedURLContainer.style.display = "block";
        shortenedURLContainer.innerHTML = `
            <h3>Your shortened URL:</h3>
            <div>${shortenedURL}</div>
            <button onclick="copyToClipboard('${shortenedURL}')">Copy</button>
        `;
    }

    window.copyToClipboard = function(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('URL copied to clipboard');
    };
});
