'use strict';

var quasiHtml = require('quasi-html');
var React = require('react');

function quasiHtmlReact(type, props, children) {
  var args = [type, props];
  if (children.length > 0) {
    args = args.concat(children);
  }
  return React.createElement.apply(React, args);
}

module.exports = quasiHtml(quasiHtmlReact);
