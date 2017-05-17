import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';

ReactDOM.render (
  <div>
    <h1> Leaderboard</h1>
  <Board class="cells" headings= {["Rank", "Camper Name","Points in Past 30 days","All Time Points"]}
  data={[[]]}/>
  </div>,
  document.getElementById("app")
);
