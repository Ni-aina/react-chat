import { createStore } from 'redux';
import onlineState from './reducers';
export const store = createStore(onlineState);