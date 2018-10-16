import {
  DELETE_VIDEO_CLIP,
  EDIT_VIDEO_CLIP,
  GET_CURRENT_CLIP,
  GET_CURRENT_VIDEO_CLIPS,
  SAVE_VIDEO_CLIP,
} from '../constants/dashBoardConstants';

export const getClip = (videoId, clipId) => ({
  type: GET_CURRENT_CLIP,
  payload: {
    videoId,
    clipId,
  },
});

export const getVideoClips = id => ({
  type: GET_CURRENT_VIDEO_CLIPS,
  payload: {
    id,
  },
});

export const saveVideoClip = (id, data) => ({
  type: SAVE_VIDEO_CLIP,
  payload: {
    id,
    data,
  },
});

export const editVideoClip = (videoId, clipId, data) => ({
  type: EDIT_VIDEO_CLIP,
  payload: {
    videoId,
    clipId,
    data,
  },
});

export const deleteVideoClip = (videoId, clipId) => ({
  type: DELETE_VIDEO_CLIP,
  payload: {
    videoId,
    clipId,
  },
});
