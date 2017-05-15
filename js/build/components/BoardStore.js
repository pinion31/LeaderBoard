'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fbemitter = require('fbemitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = void 0;
var emitter = new _fbemitter.EventEmitter();

var BoardStore = {

  getData: function getData() {
    return data;
  },

  setData: function setData(newData) {
    data = newData;

    emitter.emit('change');
  },
  init: function init() {
    data = [{}];

    return data;
  },
  addListener: function addListener(eventType, fn) {
    emitter.addListener(eventType, fn);
  },
  queryData: function queryData() {
    console.log("retrieving data");
    _jquery2.default.ajax({ url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent", cache: false,
      dataType: "json", success: function success(data) {
        console.log("returning data for " + data[0]["username"]);
        emitter.emit('change');
        //return callback(data);
        return data;
      } });
  }

};

exports.default = BoardStore;