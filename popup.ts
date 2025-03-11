document.addEventListener('DOMContentLoaded', function() {
    const syncButton = document.getElementById('syncButton');
    const statusDiv = document.getElementById('status');

    syncButton.addEventListener('click', function() {
        statusDiv.textContent = 'Syncing bookmarks...';

        chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
            // Convert bookmarks to JSON
            const bookmarksData = JSON.stringify(bookmarkTreeNodes);
            console.log('Bookmarks:', bookmarksData);

            // Send to your backend
            fetch('https://your-spring-boot-app.com/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authentication headers if needed
                    // 'Authorization': 'Bearer ' + your_token
                },
                body: bookmarksData
            })
                .then(response => response.json())
                .then(data => {
                    statusDiv.textContent = 'Bookmarks synced successfully!';
                })
                .catch(error => {
                    statusDiv.textContent = 'Error syncing bookmarks: ' + error.message;
                    console.error('Error:', error);
                });
        });
    });
});