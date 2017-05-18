import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';

ReactDOM.render (
  <div>
  <div id={"img-div"}>
    <img id={"fccimage"} src= {"./images/freeCodeCamp.svg"}></img>
  </div>

  <Board class="cells" headings= {["Rank", "Camper Name","Points in Past 30 days","All Time Points"]}
  data={[[]]}/>
  </div>,
  document.getElementById("app")
);
