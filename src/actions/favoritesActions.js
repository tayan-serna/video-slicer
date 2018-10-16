import { SET_CURRENT_FAVORITE_CLIP, SAVE_VIDEO_FAVORITE } from '../constants/favoritesConstants';

export const setFavoriteClip = data => ({
  type: SET_CURRENT_FAVORITE_CLIP,
  payload: {
    data,
  },
});

export const saveFavoriteClip = (videoId, clipId) => ({
  type: SAVE_VIDEO_FAVORITE,
  payload: {
    clipId,
    videoId,
  },
});
