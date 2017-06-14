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

{ // React component in tag name
  function Component(props) {
    return html`
      <div id='component'>
        <span>${ props.x }|${ props.y }|${ props.z }</span>
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

{ // React component in "using" attribute
  function Component(props) {
    return html`
      <span>
        ${ props.x }|${ props.y }|${ String(props.using) }|
        ${ props.children }
      </span>
    `;
  }
  assertOutput(html`
    <react-component using=${Component} x=1 y=2>
      test
    </react-component>
  `, '<span>1|2|undefined|test</span>');
}
