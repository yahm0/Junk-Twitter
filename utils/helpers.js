module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    like_value: (likes) => {
      // Increments like value by 1
      return parseInt(likes) + 1;
    },
    dislike_value: (dislikes) => {
      // Increments dislike value by 1
      return parseInt(dislikes) + 1;
    },
    // Add a helper to format plurals
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    },
    // Add a helper to format URLs
    format_url: (url) => {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    },
    // Add a helper function to check if the user is the post owner
    is_post_owner: (postUser, currentUser) => {
      if (postUser === currentUser) {
        return true;
      }
      return false;
    },
    // Add a helper function to check if the user is the comment owner
    is_comment_owner: (commentUser, currentUser) => {
      if (commentUser === currentUser) {
        return true;
      }
      return false;
    },
    // Add a helper function to check if the user is the owner of the post or comment
    is_owner: (owner, currentUser) => {
      if (owner === currentUser) {
        return true;
      }
      return false;
    },
  };