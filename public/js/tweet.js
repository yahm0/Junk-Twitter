document.addEventListener('DOMContentLoaded', () => {
    const tweetButton = document.getElementById('tweetSubmit');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsContainer = document.getElementById('tweetsContainer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            if (!entry.isIntersecting) {
                const el = entry.target;
                const id = el.dataset.tweetId;
                if (id) {
                    try {
                        const response = await fetch(`/tweets/${id}`, { method: 'DELETE' });
                        if (response.ok) {
                            el.remove();
                        }
                    } catch (err) {
                        console.error('Failed to delete tweet', err);
                    }
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0 });

    document.querySelectorAll('[data-tweet-id]').forEach(el => observer.observe(el));
    

    tweetButton.addEventListener('click', async () => {
        const tweetContent = tweetInput.value.trim();
        if (tweetContent) {
            try {
                const response = await fetch('/tweets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: tweetContent })
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    const newTweetDiv = document.createElement('div');
                    newTweetDiv.className = 'card bg-white shadow rounded-lg p-6 mb-4';
                    newTweetDiv.dataset.tweetId = data.tweet ? data.tweet.id : '';
                    newTweetDiv.innerHTML = `
                        <div class="flex flex-col">
                            <p class="text-gray-800">${data.tweet ? data.tweet.content : 'Error: Tweet content missing.'}</p>
                            <p class="text-sm text-gray-600">Posted just now</p>
                            <div class="flex items-center mt-2">
                                <button class="like-btn bg-blue-500 text-white px-2 py-1 rounded" data-tweet-id="${data.tweet.id}" data-liked="false">Like</button>
                                <span class="like-count ml-2">0</span>
                            </div>
                        </div>`;


                    tweetsContainer.prepend(newTweetDiv); // Add the new tweet at the top
                    observer.observe(newTweetDiv);
                    tweetInput.value = ''; // Clear the textarea
                } else {
                    throw new Error(data.message || 'Failed to post tweet');
                }
            } catch (error) {
                console.error('Error posting tweet:', error);
                alert(error.message);
            }
        } else {
            alert('Please enter a tweet before posting.');
        }
    });
});
