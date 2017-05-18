'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Board = require('./components/Board');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'div',
    { id: "img-div" },
    _react2.default.createElement('img', { id: "fccimage", src: "./images/freeCodeCamp.svg" })
  ),
  _react2.default.createElement(_Board2.default, { 'class': 'cells', headings: ["Rank", "Camper Name", "Points in Past 30 days", "All Time Points"],
    data: [[]] })
), document.getElementById("app"));