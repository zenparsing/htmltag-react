'use strict';

const ReactDOM = require('react-dom/server');
const html = require('../');
const assert = require('assert');

const render = ReactDOM.renderToStaticMarkup;

function trim(out) {
  return out.replace(/\n\s*/g, '');
}

function assertOutput(out, expected) {
  assert.equal(trim(render(out)), trim(expected));
}

{ // HTML Tags
  assertOutput(html`
    <div className='foobar' style=${{ display: 'none', paddingLeft: '30px' }}>
      ${ 'inner text' }
    </div>
  `, `
    <div class="foobar" style="display:none;padding-left:30px;">
      inner text
    </div>
  `);
}

{ // React functions
  function Component(props) {
    return html`
      <div id='component'>
        <span key='a'>${ props.x }|${ props.y }|${ props.z }</span>
        ${ props.children }
      </div>
    `;
  }
  assertOutput(html`
    <${Component} x='1' y='2' ${{ z: 3 }}>
      <div>Test</div>
    </>
  `, `
    <div id="component">
        <span>1|2|3</span>
      <div>Test</div>
    </div>
  `);
}
