// @vendors
import uuid from 'uuid';

// @constants
import {
  DELETE_VIDEO_CLIP,
  EDIT_VIDEO_CLIP,
  GET_CURRENT_CLIP,
  GET_CURRENT_VIDEO_CLIPS,
  SAVE_VIDEO_CLIP,
} from '../constants/dashBoardConstants';
import { SAVE_VIDEO_FAVORITE } from '../constants/favoritesConstants';

import { getVideoThumbnail } from '../utils';

import exampleVideo from '../assets/example-video.mp4';
import exampleVideo2 from '../assets/example-video-2.mp4';

const editClip = (state, action) => {
  const newState = Object.assign({}, state);
  const { clipId, data, videoId } = action.payload;
  const { clips } = newState.videoClips[videoId];
  const index = clips.map(clip => clip.id).indexOf(clipId);
  clips[index] = {
    ...clips[index],
    ...data,
  };

  return {
    ...newState,
    videoClips: {
      ...newState.videoClips,
      [action.payload.videoId]: {
        ...newState.videoClips[action.payload.videoId],
        clips,
      },
    },
  };
};

const deleteClip = (state, action) => {
  const newState = Object.assign({}, state);
  const { clipId, videoId } = action.payload;
  const { clips } = newState.videoClips[videoId];
  const index = clips.map(clip => clip.id).indexOf(clipId);
  clips.splice(index, 1);

  return {
    ...newState,
    videoClips: {
      ...newState.videoClips,
      [action.payload.videoId]: {
        ...newState.videoClips[action.payload.videoId],
        clips,
      },
    },
  };
};

const saveClip = (state, action) => {
  const newState = Object.assign({}, state);

  return {
    ...newState,
    videoClips: {
      ...newState.videoClips,
      [action.payload.id]: {
        ...newState.videoClips[action.payload.id],
        clips: [
          ...newState.videoClips[action.payload.id].clips,
          {
            ...action.payload.data,
            id: `video${action.payload.id}-clip${uuid.v4()}`,
          },
        ],
      },
    },
  };
};

const saveFavorite = (state, action) => {
  const { clipId, videoId } = action.payload;
  const newState = Object.assign({}, state);
  const { clips } = newState.videoClips[videoId];
  const index = clips.map(clip => clip.id).indexOf(clipId);
  clips[index].isFavorite = !clips[index].isFavorite;

  return {
    ...newState,
    videoClips: {
      ...newState.videoClips,
      [videoId]: {
        ...newState.videoClips[videoId],
        clips,
      },
    },
  };
};

const initialState = {
  videoClips: {
    1: {
      clips: [
        {
          countId: 1,
          id: 'video1-clip1',
          isDeleteable: false,
          isEditable: false,
          isFavorite: false,
          name: 'source video example1',
          src: exampleVideo,
          thumbnail: getVideoThumbnail(exampleVideo),
        },
      ],
      id: 1,
      src: exampleVideo,
      title: 'Example Video',
    },
    2: {
      clips: [
        {
          countId: 1,
          id: 'video2-clip1',
          isDeleteable: false,
          isEditable: false,
          isFavorite: false,
          name: 'source video example 2',
          src: exampleVideo2,
          thumbnail: getVideoThumbnail(exampleVideo2),
        },
      ],
      id: 2,
      src: exampleVideo2,
      title: 'Example Video 2',
    },
  },
  currentVideo: {},
  currentClip: {
    src: '',
  },
};

function dashboard(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_VIDEO_CLIPS:
      return {
        ...state,
        currentVideo: state.videoClips[action.payload.id],
      };
    case GET_CURRENT_CLIP:
      return {
        ...state,
        currentClip: {
          ...state.videoClips[action.payload.videoId].clips.find(
            clip => clip.id === action.payload.clipId,
          ),
        },
      };
    case SAVE_VIDEO_CLIP:
      return saveClip(state, action);
    case EDIT_VIDEO_CLIP:
      return editClip(state, action);
    case DELETE_VIDEO_CLIP:
      return deleteClip(state, action);
    case SAVE_VIDEO_FAVORITE:
      return saveFavorite(state, action);
    default:
      return state;
  }
}

export default dashboard;
