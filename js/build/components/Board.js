'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_Component) {
  _inherits(Board, _Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = {
      displayName: "freeCodeCamp Leaderboard",
      headings: _this.props.headings,
      data: _this.props.data,
      descending: false,
      cells: _this.props.class,
      indices: ["rank", "username", "recent", "alltime"],
      getData: function () {
        _jquery2.default.ajax({ url: "https://fcctop100.herokuapp.com/api/fccusers/top/recent", cache: false,
          dataType: "json", success: function (newData) {

            this.setState({
              data: newData
            });
          }.bind(this)
        });
      }.bind(_this)()

    };

    return _this;
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'caption',
          null,
          _react2.default.createElement(
            'h1',
            null,
            this.state.displayName
          )
        ),
        _react2.default.createElement(
          'thead',
          { onClick: this._sortData.bind(this) },
          _react2.default.createElement(
            'tr',
            null,
            this.state.headings.map(function (title, id) {
              return _react2.default.createElement(
                'th',
                { key: id },
                title
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this.state.data.map(function (row, rowId) {
            var rowNumber = this.state.descending ? 100 - rowId : rowId + 1;

            return _react2.default.createElement(
              'tr',
              { key: rowId },
              _react2.default.createElement(
                'td',
                null,
                rowNumber,
                ' '
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('img', { id: "icon", src: row["img"] }),
                ' ',
                _react2.default.createElement(
                  'span',
                  { id: 'name' },
                  row["username"]
                ),
                ' '
              ),
              _react2.default.createElement(
                'td',
                null,
                row["recent"],
                ' '
              ),
              _react2.default.createElement(
                'td',
                null,
                row["alltime"],
                ' '
              )
            );
          }.bind(this))
        )
      );
    }
  }, {
    key: '_sortData',
    value: function _sortData(e) {
      var column = e.target.cellIndex;

      var data = Array.from(this.state.data);

      if (column === 2 || column === 3) {
        data.sort(function (a, b) {
          return this.state.descending ? a[this.state.indices[column]] < b[this.state.indices[column]] ? 1 : -1 : a[this.state.indices[column]] > b[this.state.indices[column]] ? 1 : -1;
        }.bind(this));

        this.setState({
          data: data,
          descending: !this.state.descending
        });
      }
    }
  }]);

  return Board;
}(_react.Component);

Board.propTypes = {
  headings: _react.PropTypes.arrayOf(_react.PropTypes.any),
  data: _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.any))

};

exports.default = Board;