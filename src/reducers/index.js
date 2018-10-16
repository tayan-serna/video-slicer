// @vendors
import { combineReducers } from 'redux';

import dashboard from './dashboardReducer';
import favorites from './favoritesReducer';

export default combineReducers({
  dashboard,
  favorites,
});
