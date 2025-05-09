/* Task 1 - Complete the function according to the TODO */
function addComment(username, comment, addToStart) {
  const combinedComment = `${username}: ${comment}`;

  if (addToStart) {
    comments.unshift(combinedComment);
  } else {
    comments.push(combinedComment);
  }
}

/* Task 2 - Create your showWinnerMessage below according to the TODO */
function showWinnerMessage(message) {
  const winnerDisplay = document.getElementById("winner-display");
  winnerDisplay.innerHTML = message;
}

/* Task 3 - Create your pickWinner below according to the TODO */
function pickWinner() {
  const randomIndex = Math.floor(Math.random() * comments.length);
  const winningEntry = comments[randomIndex];

  const message = `Winner: <strong class="text-success">${winningEntry}</strong>`;
  showWinnerMessage(message);

  // ADDED AFTER TASK 1
  showRandomEmoji();

  // ADDED IN LEVEL UP
  highlightWinner(randomIndex);
}

/* Task 4 - Complete the function according to the TODO */
function showRandomEmoji() {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const emojiDisplayElement = document.getElementById("winner-emoji");
  emojiDisplayElement.innerText = randomEmoji;
}

/* Task 5 - Complete the function according to the TODO */
function reverseOrder() {
  comments.reverse();
}

/* Task 6 - Complete the function according to the TODO */
function removeComment(index) {
  comments.splice(index, 1);
}

/* Task 7 - Complete the function according to the TODO */
function isEmojiOnly(str) {
  const comment = str.split(":")[1];
  if (!comment) return false;
  return /^[\p{Emoji}\s]+$/u.test(comment.trim());
}

function filterEmojiComments() {
  const filtered = comments.filter((comment) => !isEmojiOnly(comment));
  return filtered;
}

/* Level Ups */

/* Level Up - Task 8 - Complete the filterList function according to the TODO */
function filterList(searchTerm, searchUsers) {
  return comments.filter((comment) => {
    if (searchUsers) {
      return comment.split(":")[0].toLowerCase().includes(searchTerm);
    } else {
      return comment.split(":")[1].toLowerCase().includes(searchTerm);
    }
  });
}

/* Level Up - Task 9 - Complete the highlightWinner function according to the TODO */
function highlightWinner(index) {
  const commentsList = document.querySelector("#comments-list .list-group");
  const commentElements = commentsList.querySelectorAll(".list-group-item");
  const winnerElement = commentElements[index];

  const previousWinner = commentsList.querySelector(".winner");
  if (previousWinner) {
    previousWinner.classList.remove("winner", "text-success");
  }

  winnerElement.classList.add("winner", "text-success");
}

/* Level Up - Task 10 - Add to the `addComment` function so that the an `@` sign is added to the username if there is not already one before it gets pushed into the array.  */
