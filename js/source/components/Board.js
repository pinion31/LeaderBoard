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
      descending:false,
      cells:this.props.class,
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
          <caption><h1>{this.state.displayName}</h1></caption>
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
                var rowNumber = this.state.descending? 100-rowId:rowId+1;

                return(
                  <tr key={rowId}>
                   <td>{rowNumber} </td>
                   <td><img id={"icon"} src = {row["img"]} /> <span id="name">{row["username"]}</span> </td>
                   <td>{row["recent"]} </td>
                   <td>{row["alltime"]} </td>
                  </tr>
                )
              }.bind(this))
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