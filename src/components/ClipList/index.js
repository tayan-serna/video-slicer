/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { Button, TextField } from 'react-md';
import uuid from 'uuid';

const ClipListContainer = glamorous.section({
  display: 'inline-block',
  ' ul': {
    ' li': {
      listStyle: 'none',
    },
  },
});

const TagsContainer = glamorous.div({
  padding: '.5rem',
  ' span': {
    background: 'gray',
    padding: 4,
    margin: '0 5px',
  },
});

const ClipContainer = glamorous.div({
  alignItems: 'center',
  display: 'flex',
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
});

class ClipList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      clips: props.clips,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clips } = nextProps;
    const { clips: oldClips } = this.props;
    if (JSON.stringify(oldClips) !== JSON.stringify(clips)) {
      this.setState({
        clips,
      });
    }
  }

  handleFilterChange = (filter) => {
    const { clips } = this.props;

    const filteredClips = clips
      .filter((elem) => { // eslint-disable-line
        for (let i = 0; i < elem.tags.length; i += 1) {
          if (elem.tags[i].match(new RegExp(filter, 'ig'))) return elem;
        }
      });

    this.setState({
      filter,
      clips: filter ? filteredClips : clips,
    });
  }

  render() {
    const {
      handleClick,
      onDeleteClip,
      onEditClip,
      onSaveClip,
      videoId,
      onlyView,
    } = this.props;

    const { clips } = this.state;

    const { filter } = this.state;

    return (
      <ClipListContainer>
        <TextField
          id="clip-filter"
          placeholder="search"
          className="clip-filter"
          onChange={this.handleFilterChange}
          value={filter}
        />
        {
          clips.length
            ? (
              <ul>
                {
                  clips.map(clip => (
                    <li key={clip.id}>
                      <ClipContainer>
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
                              onClick={() => onEditClip(clip)}
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
                      </ClipContainer>
                      <TagsContainer>
                        {
                          clip.tags.length
                            ? clip.tags.map(tag => (
                              <span key={uuid.v4()}>{tag}</span>
                            ))
                            : null
                        }
                      </TagsContainer>
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
  }
}

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
