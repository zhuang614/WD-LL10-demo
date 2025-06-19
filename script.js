// Convert flat comment strings from data.js into structured objects
if (Array.isArray(comments)) {
  comments = comments.map(c => {
    const splitIndex = c.indexOf(':');
    return {
      user: c.slice(0, splitIndex).trim(),
      text: c.slice(splitIndex + 1).trim()
    };
  });
} else {
  comments = [];
}

// Reassign emojis from data.js to expected variable
const emojiList = typeof emojis !== 'undefined' ? emojis : [];

/* Task 1 - addComment */
function addComment(username, comment, addToStart) {
  // Ensure username starts with '@'
  if (!username.startsWith('@')) {
    username = '@' + username;
  }

  const newComment = {
    user: username,
    text: comment
  };

  if (addToStart) {
    comments.unshift(newComment);
  } else {
    comments.push(newComment);
  }

  renderComments();
}

/* Helper - render all comments */
function renderComments() {
  const listGroup = document.querySelector('.list-group');
  listGroup.innerHTML = '';

  comments.forEach((commentObj, index) => {
    const item = document.createElement('div');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';

    const content = document.createElement('div');
    content.innerHTML = `<strong>${commentObj.user}</strong>: ${commentObj.text}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-outline-danger';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeComment(index);

    item.appendChild(content);
    item.appendChild(removeBtn);
    listGroup.appendChild(item);
  });
}

/* Task 2 - showWinnerMessage */
function showWinnerMessage(message) {
  const winnerDisplay = document.getElementById("winner-display");
  winnerDisplay.innerHTML = message;
}

/* Task 3 - pickWinner */
function pickWinner() {
  if (comments.length === 0) {
    alert("No comments to pick from!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * comments.length);
  const winner = comments[randomIndex];

  const message = `🎉 <strong>${winner.user}</strong> wins with the comment: "<em>${winner.text}</em>"`;
  showWinnerMessage(message);
  showRandomEmoji();
}

/* Task 4 - showRandomEmoji */
function showRandomEmoji() {
  if (!Array.isArray(emojiList) || emojiList.length === 0) {
    console.warn("No emojis available in emojiList.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * emojiList.length);
  const randomEmoji = emojiList[randomIndex];

  const emojiElement = document.getElementById("winner-emoji");
  emojiElement.textContent = randomEmoji;
}

/* Task 5 - reverseOrder */
function reverseOrder() {
  comments.reverse();
  renderComments();
}

/* Task 6 - removeComment */
function removeComment(index) {
  comments.splice(index, 1);
  renderComments();
}

/* Task 7 - filterEmojiComments */
function filterEmojiComments() {
  comments = comments.filter(commentObj => {
    const text = commentObj.text.trim();
    return /[a-zA-Z0-9]/.test(text);
  });
  renderComments();
}

/* Task 8 - filterList */
function filterList(searchTerm, searchUsers) {
  const filtered = comments.filter(commentObj => {
    const term = searchTerm.toLowerCase();
    return searchUsers
      ? commentObj.user.toLowerCase().includes(term)
      : commentObj.text.toLowerCase().includes(term);
  });

  const listGroup = document.querySelector('.list-group');
  listGroup.innerHTML = '';

  filtered.forEach((commentObj) => {
    const realIndex = comments.findIndex(c =>
      c.user === commentObj.user && c.text === commentObj.text
    );

    const item = document.createElement('div');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';

    const content = document.createElement('div');
    content.innerHTML = `<strong>${commentObj.user}</strong>: ${commentObj.text}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-outline-danger';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeComment(realIndex);

    item.appendChild(content);
    item.appendChild(removeBtn);
    listGroup.appendChild(item);
  });
}

/* Task 9 - Event Listeners */
// Add comment button
document.getElementById("submit-comment").addEventListener("click", () => {
  const usernameInput = document.getElementById("new-username");
  const commentInput = document.getElementById("new-comment");
  const addToStart = document.getElementById("add-to-start").checked;

  const username = usernameInput.value.trim();
  const comment = commentInput.value.trim();

  if (username && comment) {
    addComment(username, comment, addToStart);
    usernameInput.value = '';
    commentInput.value = '';
  }
});

// Pick winner button
document.getElementById("pick-winner-btn").addEventListener("click", pickWinner);

// Reverse list button
document.getElementById("reverse-list").addEventListener("click", reverseOrder);

// Filter emoji-only comments button
document.getElementById("filter-emoji").addEventListener("click", filterEmojiComments);

// Search input listener
document.getElementById("search-input").addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  const searchUsers = document.getElementById("search-users").checked;
  filterList(searchTerm, searchUsers);
});

// Initial render on load
renderComments();
