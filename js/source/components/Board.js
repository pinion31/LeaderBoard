import React from 'react';
import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import BoardStore from './BoardStore';
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
        //console.log("returning data for " + newData);
         //console.log("this is " + this.props);
        //emitter.emit('change');
        //return callback(data);
        this.setState({
          data: newData,
          });


        }.bind(this)
      }


    );
    }.bind(this)()
      //boardData:BoardStore.queryData(),
    };


    //this.boardData = BoardStore.queryData();

    /*
    BoardStore.addListener('change', () => {
      console.log("data is " + this.state.boardData);
      this.setState({
          data: this.state.boardData.getData(),
      })
    });*/

  }

  /*
  _getRows(rowInput) {
      var n;
      var arr = [];
      for (n in rowInput) {
        if (rowInput.hasOwnProperty(n)) {
          arr.push(<td key={n}> {rowInput[n]} </td>);
        }
      }
      return arr;
  }*/

  componentDidUpdate() {
    //console.log("data has been updated:" + this.state.data);
  }

  componentWillUpdate() {
   // console.log("updating with new info");
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
             /*
            function() {
              var newData = this.state.data;
              var arr = [];
              //console.log("data is " + newData);
              //[{,,,},{,,,,}]
              //row is an object ({,,,})

              this.state.data.map(function(row, rowId){

                return(
                  <tr key={rowId}>
                   <td key={rowId}>{row["username"]} </td>
                   {function() {console.log(row["username"]);}() }
                  </tr>
                )
              });
              //return arr;
          }.bind(this)()*/

          /* arr.map(function(cell,cellId) {
                      return (<td key={cellId}> {cell} </td>);
                    })*/
          /* {function() {
                      for (var n in row) {
                        if (row.hasOwnProperty(n)) {
                          arr.push(row[n]);
                          //console.log(arr);
                          console.log(row[n]);
                        }
                      }
                      console.log(arr);
                      //return arr;
                    }.bind(this)()*/

          /*this.state.data.map(function(row, rowId){
                console.log("row2 is " + this.state.data);
                return (
                  <tr key={rowId}>
                    { function(row) {
                        console.log("row is " + this.state.data);
                        var n;
                        var arr = [];
                        for (n in row) {
                          if (row.hasOwnProperty(n)) {
                            arr.push(<td key={n}> {row[n]} </td>);
                          }
                        }

                        for (var i in arr) {
                           console.log(i);
                        }
                      //  return {arr};
                      }()
                    }
                  </tr>)
            })*/

          }
        </tbody>

        </table>);

    }



    /*

                    var n;
                    var arr = [];
                    for (n in row) {
                        if (row.hasOwnProperty(n)) {
                          return <td key={n}> {row[n]} </td>;
                        }
                      }*/
                    //  return arr;*/


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