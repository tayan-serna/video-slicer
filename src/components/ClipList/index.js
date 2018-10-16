/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
// @vendors
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { Button } from 'react-md';

const ClipListContainer = glamorous.section({
  ' ul': {
    ' li': {
      alignItems: 'center',
      display: 'flex',
      listStyle: 'none',
      ' .clip-button': {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        margin: '.5rem',
        ' span': {
          padding: '1rem',
        },
      },
      ' .favorite-button--active': {
        color: 'red',
      },
    },
  },
});

const ClipList = ({
  clips,
  handleClick,
  onDeleteClip,
  onEditClip,
  onSaveClip,
  videoId,
  onlyView,
}) => (
  <ClipListContainer>
    {
      clips.length
        ? (
          <ul>
            {
              clips.map(clip => (
                <li key={clip.id}>
                  <div
                    role="button"
                    className="clip-button"
                    onClick={() => {
                      if (onlyView) {
                        handleClick(clip);
                      } else {
                        handleClick(videoId, clip.id);
                      }
                    }}
                  >
                    <img src={clip.thumbnail} alt="clip thumbnail" />
                    <span>{clip.name}</span>
                  </div>
                  {
                    (clip.isEditable && !onlyView) && (
                      <Button
                        className="edit-button"
                        icon
                        onClick={() => onEditClip(clip.id, clip.name)}
                        primary
                        tooltipLabel="edit clip"
                        tooltipPosition="top"
                      >
                        edit
                      </Button>
                    )
                  }
                  {
                    (clip.isDeleteable && !onlyView) && (
                      <Button
                        className="delete-button"
                        icon
                        onClick={() => onDeleteClip(videoId, clip.id)}
                        tooltipLabel="delete clip"
                        tooltipPosition="top"
                      >
                        delete
                      </Button>
                    )
                  }
                  {
                    !onlyView && (
                      <Button
                        className={`favorite-button ${clip.isFavorite && 'favorite-button--active'}`}
                        icon
                        onClick={() => onSaveClip(videoId, clip.id)}
                        tooltipLabel="Add to favorites"
                        tooltipPosition="top"
                      >
                        favorite
                      </Button>
                    )
                  }
                </li>
              ))
            }
          </ul>
        )
        : (
          <div>
            There is not clip for this video...
            <br />
            create One
          </div>
        )
    }
  </ClipListContainer>
);

ClipList.propTypes = {
  clips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  onDeleteClip: PropTypes.func,
  onEditClip: PropTypes.func,
  onSaveClip: PropTypes.func,
  videoId: PropTypes.number,
  onlyView: PropTypes.bool,
};

ClipList.defaultProps = {
  onDeleteClip: () => {},
  onEditClip: () => {},
  onSaveClip: () => {},
  videoId: null,
  onlyView: false,
};

export default ClipList;
