'use strict';

var htmlTag = require('htmltag');
var React = require('react');

function htmlTagReact(type, props, children) {
  var args = [type, props];
  if (children.length > 0) {
    args = args.concat(children);
  }
  return React.createElement.apply(React, args);
}

module.exports = htmlTag(htmlTagReact);
