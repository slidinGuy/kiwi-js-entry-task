import { combineReducers } from 'redux';
import flights from './flights';
import meta from './meta';
import locations from './locations';

const root = combineReducers({
  flights,
  meta,
  locations
});

export default root;