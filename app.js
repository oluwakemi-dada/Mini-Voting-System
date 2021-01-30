// GET ELEMENTS
const housemates = document.querySelector('.housemates');
const availableVotesEl = document.querySelector('.available-votes');
const progress = document.querySelector('progress');
const votes = document.querySelectorAll('.votes');
const votesArr = Array.from(votes);

// DEFAULT VALUES UPON INITIALIZATION
const housematesTBE = [
  { name: 'Dorathy', voteCount: 0 },
  { name: 'Ozo', voteCount: 0 },
  { name: 'Vee', voteCount: 0 },
  { name: 'Laycon', voteCount: 0 },
  { name: 'Nengi', voteCount: 0 },
  { name: 'Neo', voteCount: 0 },
];

const totalVotes = 10000;
let availableVotes = 10000;
let usedVotes = 0;
let upVoteValue;
let downVoteValue;
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
    // DO NOTHING
  } else {
    const output = `
    <small class="error-msg">${msg}</small>
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
      housematesTBE[index].voteCount = voteValue;
      // If input value is NaN
    } else {
      housematesTBE[index].voteCount = 0;
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

// INPUT EVENT
housemates.addEventListener('input', (e) => {
  if (e.target.className === 'votes') {
    if (e.target.value < 0) {
      // Invalid Vote
      showError(e, '*Invalid vote');
      e.target.value = 0;
      voteByInput(e);
    } else {
      voteByInput(e);
    }
  }
});

// VOTE BY UPVOTES
const voteByUpvote = (e) => {
  upVoteValue = parseInt(e.target.previousElementSibling.value);
  upVoteValue++;
  e.target.previousElementSibling.value = upVoteValue;
  usedVotes = 0;
  votesArr.forEach((vote, index) => {
    const voteValue = parseInt(vote.value);
    if (!isNaN(voteValue)) {
      usedVotes += voteValue;
      housematesTBE[index].voteCount = voteValue;
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

// UP-VOTES EVENT
housemates.addEventListener('click', (e) => {
  if (e.target.className === 'up-vote') {
    if (availableVotes > 0) {
      voteByUpvote(e);
    } else {
      showError(e, '*Excess vote');
    }
  }
});

// VOTE BY DOWNVOTES
const voteByDownvote = (e) => {
  downVoteValue = parseInt(e.target.nextElementSibling.value);
  downVoteValue--;
  e.target.nextElementSibling.value = downVoteValue;
  usedVotes = 0;
  votesArr.forEach((vote, index) => {
    const voteValue = parseInt(vote.value);
    if (!isNaN(voteValue)) {
      usedVotes += voteValue;
      housematesTBE[index].voteCount = voteValue;
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

// DOWN-VOTE EVENT
housemates.addEventListener('click', (e) => {
  if (e.target.className === 'down-vote') {
    if (
      e.target.nextElementSibling.value > 0 &&
      e.target.nextElementSibling.value <= totalVotes
    ) {
      voteByDownvote(e);
    } else if (
      availableVotes < 0 &&
      parseInt(e.target.nextElementSibling.value) > 0
    ) {
      downVoteValue = parseInt(e.target.nextElementSibling.value);
      downVoteValue--;
      e.target.nextElementSibling.value = downVoteValue;
      voteByInput(e);
    }
  }
});

// VIEW LEADERBOARD
const viewLeaderBoard = () => {
  if (availableVotes === 0) {
    // Sort Vote Count
    housematesTBE.sort((a, b) => {
      return b.voteCount - a.voteCount;
    });
    console.log(housematesTBE);

    // Populate results
    document.querySelector('body').textContent = '';
    const results = `
      <section class="leaderboard">
      <div class='leaderboard-heading'>Leaderboard</div>
      <div class="housemates">
        
      </div>
      <p class="evicted">${
        housematesTBE[housematesTBE.length - 1].name
      } was evicted</p>
      <div>
        <div class="back-to-vote">Back To Vote</div>
      </div>
    </section>
    `;

    document.querySelector('body').innerHTML = results;

    let output = '';
    housematesTBE.forEach((hmTBE, index) => {
      output += `
      <div class="lb-housemate">
         <div>
           <img src="./img/${hmTBE.name}.jpg" />
           <p>${hmTBE.name}</p>
         </div>
         <div>${index + 1}</div>
       </div>
      `;
    });
    document
      .querySelector('.housemates')
      .insertAdjacentHTML('beforeend', output);
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
