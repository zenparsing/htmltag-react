'use strict';

var quasiHtml = require('quasi-html');
var React = require('react');

function quasiHtmlReact(type, props, children) {
  if (typeof props.using === 'function') {
    var p = {};
    Object.keys(props).forEach(function(key) {
      if (key !== 'using') {
        p[key] = props[key];
      }
    });
    type = props.using;
    props = p;
  }
  var args = [type, props];
  if (children.length > 0) {
    args = args.concat(children);
  }
  return React.createElement.apply(React, args);
}

module.exports = quasiHtml(quasiHtmlReact);
