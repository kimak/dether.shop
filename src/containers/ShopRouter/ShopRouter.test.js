/* global describe it expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import TestUtils from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import fakeStore from '../../constants/test/fakeStore';
import ShopRouter from './index';
import jsdom from 'jsdom'
const { JSDOM } = jsdom;


/*** Set up test environment to run in a browser-like environment ***/
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.document = document;
global.window = global.document.defaultView

configure({ adapter: new Adapter() });

const store = fakeStore({});

describe('Container ShopRouter', () => {
  it('should be render without crash', () => {
    const component = TestUtils.renderIntoDocument(
        <Provider store={store}><Router><ShopRouter hasShop isUserVerified /></Router></Provider>
    );
    expect(component).not.toBe(null);
  });
});
