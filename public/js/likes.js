document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tweetsContainer');
  if (!container) return;

  container.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('like-btn')) return;
    const btn = e.target;
    const tweetId = btn.dataset.tweetId;
    const liked = btn.dataset.liked === 'true';
    const method = liked ? 'DELETE' : 'POST';
    try {
      const res = await fetch(`/likes/${tweetId}`, { method });
      if (res.ok) {
        const countSpan = btn.parentElement.querySelector('.like-count');
        let count = parseInt(countSpan.textContent);
        if (liked) {
          count -= 1;
          btn.textContent = 'Like';
          btn.dataset.liked = 'false';
        } else {
          count += 1;
          btn.textContent = 'Unlike';
          btn.dataset.liked = 'true';
        }
        countSpan.textContent = count;
      } else {
        console.error('Failed to update like');
      }
    } catch (err) {
      console.error(err);
    }
  });
});
