import { SET_CURRENT_FAVORITE_CLIP } from '../constants/favoritesConstants';

const initialState = {
  currentClip: {
    src: '',
  },
};

function favorites(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_FAVORITE_CLIP:
      return {
        ...state,
        currentClip: {
          src: action.payload.data.src,
        },
      };
    default:
      return state;
  }
}

export default favorites;
