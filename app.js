// GET ELEMENTS
const progress = document.querySelector('progress');
const upVote0 = document.querySelector('.up-vote0');
const downVote0 = document.querySelector('.down-vote0');
const upVote1 = document.querySelector('.up-vote1');
const downVote1 = document.querySelector('.down-vote1');
const upVote2 = document.querySelector('.up-vote2');
const downVote2 = document.querySelector('.down-vote2');
const upVote3 = document.querySelector('.up-vote3');
const downVote3 = document.querySelector('.down-vote3');
const upVote4 = document.querySelector('.up-vote4');
const downVote4 = document.querySelector('.down-vote4');
const upVote5 = document.querySelector('.up-vote5');
const downVote5 = document.querySelector('.down-vote5');
const housemates = document.querySelector('.housemates');
const availableVotesEl = document.querySelector('.available-votes');
const votes = document.querySelectorAll('.votes');
const votesArr = Array.from(votes);

// DEFAULT VALUES ON INITIALIZATION
const housematesTBE = ['Dorathy', 'Ozo', 'Vee', 'Laycon', 'Nengi', 'Neo'];
const totalVotes = 10000;
let availableVotes = 10000;
let voteCount = [0, 0, 0, 0, 0, 0];
let usedVotes = 0;
progress.max = totalVotes;
progress.value = availableVotes;
availableVotesEl.textContent = availableVotes
  .toString()
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

// REMOVE ERROR MESSAGE
const removeError = () => {
  setTimeout(() => {
    document.querySelector('small').remove();
  }, 1200);
};

// SHOW ERROR MESSAGE
const showError = (e, msg) => {
  if (e.target.parentElement.nextElementSibling) {
    document.querySelector('small').style.display = 'none';
  } else {
    const output = `
    <small>${msg}</small>
    `;

    e.target.parentElement.insertAdjacentHTML('afterend', output);
    removeError();
  }
};

// VOTE BY INPUT
const voteByInput = (e) => {
  usedVotes = 0;
  votesArr.forEach((vote, index) => {
    const voteValue = parseInt(vote.value);
    if (!isNaN(voteValue)) {
      usedVotes += voteValue;
      voteCount[index] = voteValue;
      // If input value is NaN
    } else {
      voteCount[index] = 0;
    }
  });
  availableVotes = totalVotes - usedVotes;
  if (availableVotes > -1) {
    // Update available votes and Progress bar
    availableVotesEl.textContent = availableVotes
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    progress.value = availableVotes;
  } else {
    showError(e, '*Excess vote');
  }
};

// VOTE BY INPUT
housemates.addEventListener('input', (e) => {
  if (e.target.className === 'votes') {
    if (e.target.value < 0) {
      // Invalid Vote
      showError(e, '*Invalid vote');
    } else {
      voteByInput(e);
    }
  }
});

// DECREASE AVAILABLE VOTES
const decreaseAvailableVotes = () => {
  // Update available votes and Progress bar
  availableVotes--;
  availableVotesEl.textContent = availableVotes
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  progress.value = availableVotes;
};

// INCREASE AVAILABLE VOTES
const increaseAvailableVotes = () => {
  // Update available votes and Progress bar
  availableVotes++;
  availableVotesEl.textContent = availableVotes
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  progress.value = availableVotes;
};

// INCREASE VOTE COUNT
const increaseVoteCount = (e, index) => {
  voteCount[index]++;
  e.target.previousElementSibling.value = voteCount[index];
  decreaseAvailableVotes();
};

// DECREASE VOTE COUNT
const decreaseVoteCount = (e, index) => {
  voteCount[index]--;
  e.target.nextElementSibling.value = voteCount[index];
  increaseAvailableVotes();
};

// DECREASE COUNT ONLY
const decreaseVoteCountOnly = (e, index) => {
  voteCount[index]--;
  e.target.nextElementSibling.value = voteCount[index];
  voteByInput(e);
};

// INCREASE VOTE COUNT ONLY
const increaseVoteCountOnly = (e, index) => {
  voteCount[index] = 1;
  e.target.previousElementSibling.value = voteCount[index];
  voteByInput(e);
};

// UPVOTES
upVote0.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 0);
  } else if (voteCount[0] < 0) {
    increaseVoteCountOnly(e, 0);
  } else {
    showError(e, '*Excess vote');
  }
});

upVote1.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 1);
  } else if (availableVotes > totalVotes) {
    increaseVoteCountOnly(e, 1);
  } else {
    showError(e, '*Excess vote');
  }
});

upVote2.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 2);
  } else if (availableVotes > totalVotes) {
    increaseVoteCountOnly(e, 2);
  } else {
    showError(e, '*Excess vote');
  }
});

upVote3.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 3);
  } else if (availableVotes > totalVotes) {
    increaseVoteCountOnly(e, 3);
  } else {
    showError(e, '*Excess vote');
  }
});

upVote4.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 4);
  } else if (availableVotes > totalVotes) {
    increaseVoteCountOnly(e, 4);
  } else {
    showError(e, '*Excess vote');
  }
});

upVote5.addEventListener('click', (e) => {
  if (availableVotes > 0) {
    increaseVoteCount(e, 5);
  } else if (availableVotes > totalVotes) {
    increaseVoteCountOnly(e, 5);
  } else {
    showError(e, '*Excess vote');
  }
});

// DOWNVOTES
downVote0.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 0);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 0);
  }
});

downVote1.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 1);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 1);
  }
});

downVote2.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 2);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 2);
  }
});

downVote3.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 3);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 3);
  }
});

downVote4.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 4);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 4);
  }
});

downVote5.addEventListener('click', (e) => {
  if (
    e.target.nextElementSibling.value > 0 &&
    e.target.nextElementSibling.value <= totalVotes
  ) {
    decreaseVoteCount(e, 5);
  } else if (availableVotes < 0) {
    decreaseVoteCountOnly(e, 5);
  }
});

// VIEW LEADERBOARD
const viewLeaderBoard = () => {
  if (availableVotes === 0) {
    // Find Minimum vote
    const minVote = Math.min(...voteCount);
    const minVoteIndex = voteCount.indexOf(minVote);

    // Populate results
    document.querySelector('body').textContent = '';
    const results = `
      <section class="leaderboard">
      <div class='leaderboard-heading'>Leaderboard</div>
      <div class="housemates">
        <div class="lb-housemate">
          <div>
            <img src="./img/dorathy.jpg" />
            <p>${housematesTBE[0]}</p>
          </div>
          <div>${voteCount[0]}</div>
        </div>
        <div class="lb-housemate">
          <div>
            <img src="./img/ozo.jpg" />
            <p>${housematesTBE[1]}</p>
          </div>
          <div>${voteCount[1]}</div>
        </div>
        <div class="lb-housemate">
          <div>
            <img src="./img/vee.jpg" />
            <p>${housematesTBE[2]}</p>
          </div>
          <div>${voteCount[2]}</div>
        </div>
        <div class="lb-housemate">
          <div>
            <img src="./img/laycon.jpg" />
            <p>${housematesTBE[3]}</p>
          </div>
          <div>${voteCount[3]}</div>
        </div>
        <div class="lb-housemate">
          <div>
            <img src="./img/nengi.jpg" />
            <p>${housematesTBE[4]}</p>
          </div>
          <div>${voteCount[4]}</div>
        </div>
        <div class="lb-housemate">
          <div>
            <img src="./img/neo.jpg" />
            <p>${housematesTBE[5]}</p>
          </div>
          <div>${voteCount[5]}</div>
        </div>
      </div>
      <p class="evicted">${housematesTBE[minVoteIndex]} was evicted</p>
      <div>
        <div class="back-to-vote">Back To Vote</div>
      </div>
    </section>
    `;
    document.querySelector('body').innerHTML = results;
  } else {
    // Show error
    document.querySelector('.view-leaderboard-error').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.view-leaderboard-error').style.display = 'none';
    }, 2000);
  }
};

// VIEW LEADERBOARD
document
  .querySelector('.view-leaderboard')
  .addEventListener('click', viewLeaderBoard);

// BACK TO VOTE / HOME PAGE
document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.className === 'back-to-vote') {
    window.location.reload();
  }
});
