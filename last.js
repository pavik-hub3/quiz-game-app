const endScore = document.getElementById('endScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');  

endScore.innerText = mostRecentScore;     