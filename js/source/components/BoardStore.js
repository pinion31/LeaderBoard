import {Component} from 'react';
import $ from 'jquery';
import {EventEmitter} from 'fbemitter';

let data;
const emitter = new EventEmitter();

const BoardStore = {

  getData: () => {
    return data;
  },

  setData:(newData) => {
    data = newData;

    emitter.emit('change');
  },
  init:() => {
    data = [{}];

    return data;
  },
  addListener: (eventType, fn) => {
    emitter.addListener(eventType,fn);
  },
  queryData:() => { console.log("retrieving data");
    $.ajax({url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent", cache:false,
      dataType:"json", success:function(data) {
        console.log("returning data for " + data[0]["username"]);
        emitter.emit('change');
        //return callback(data);
        return data;

      }}


    );
  }

};

export default BoardStore