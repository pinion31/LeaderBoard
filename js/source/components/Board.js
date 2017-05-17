import React from 'react';
import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName:"freeCodeCamp Leaderboard",
      headings:this.props.headings,
      data:this.props.data,
      descending:true,
      indices:["rank","username","recent","alltime"],
      getData: function() {
      $.ajax({url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent", cache:false,
      dataType:"json", success:function(newData) {

        this.setState({
          data: newData,
          });


        }.bind(this)
      }


    );
    }.bind(this)()

    };

  }

   render() {
      return(
        <table>
          <caption>{this.state.displayName}</caption>
          <thead onClick={this._sortData.bind(this)}>
            <tr>
              {this.state.headings.map(function(title, id) {
                return <th key={id}>{title}</th>;
                })
              }
            </tr>
          </thead>
        <tbody>
          {  this.state.data.map(function(row, rowId){
               // console.log("rerendering");
                return(
                  <tr key={rowId}>
                   <td >{rowId+1} </td>
                   <td >{row["username"]} </td>
                   <td >{row["recent"]} </td>
                   <td >{row["alltime"]} </td>
                  </tr>
                )
              })
          }
        </tbody>

        </table>);

    }

    _sortData(e) {
      const column = e.target.cellIndex;

      const data = Array.from(this.state.data);

      if (column === 2 || column === 3) {
      data.sort(function(a,b) {
        return this.state.descending?
        a[this.state.indices[column]]< b[this.state.indices[column]]? 1: -1:
        a[this.state.indices[column]]> b[this.state.indices[column]]? 1: -1
        }.bind(this));

        this.setState({
          data:data,
          descending:!this.state.descending,
        });
      }
    }


}

Board.propTypes = {
  headings:PropTypes.arrayOf(
    PropTypes.any
  ),
  data:PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.any
    )
  ),

};

export default Board