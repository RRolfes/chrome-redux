import { applyMiddleware, createStore } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import aliases from './actions/backgroundAliases';
import reducer from './reducer';

// Aliases!
// They are needed since communication between the parts of our extension
// via message passing only supports JSON-serializable objects. Standard
// FSAs are easily serialized onto objects, but thunks (our promise-based
// flows) are not, so we create a specific action type to be issued on the
// popup page that maps onto a thunk on the background page. More on aliases
// ahead.

const logger = createLogger();

const initialState = {
  lists: {
    activeId: null,
    records: []
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    alias(aliases),
    thunkMiddleware,
    logger
  )
);

wrapStore(store, {
  portName: 'BOOKMARKSAVER'
});

export default store;
