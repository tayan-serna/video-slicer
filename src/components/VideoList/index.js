/* eslint-disable react/no-access-state-in-setstate */
// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { Button, DialogContainer, TextField } from 'react-md';

// @components
import ClipList from '../ClipList';

import { getVideoThumbnail } from '../../utils';

const VideoListContainer = glamorous.section({
  width: '100%',
  textAlign: 'left',
  padding: '2rem',
  ' .video-list': {
    display: 'inline-block',
    ' ul': {
      ' li': {
        listStyle: 'none',
      },
    },
  },
});

const TitleContainer = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  padding: '1rem',
  ' h3': {
    margin: 0,
  },
  ' button': {
    marginLeft: '.5rem',
  },
});

const initialState = {
  clip: {
    name: '',
    start: '',
    end: '',
    tags: '',
  },
  currentClipId: null,
  currentVideoId: null,
  videoSrc: '',
  visible: false,
  isNew: true,
};

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  show = (currentVideoId, videoSrc) => {
    this.setState({
      currentVideoId,
      videoSrc,
      visible: true,
    });
  }

  hide = () => {
    this.setState({ visible: false });
  };

  onConfirm = () => {
    const { onCreateClip } = this.props;
    const { currentVideoId, clip, videoSrc } = this.state;

    onCreateClip(currentVideoId, {
      isDeleteable: true,
      isEditable: true,
      name: `${clip.name} // ${clip.start} - ${clip.end}`,
      src: `${videoSrc}#t=${clip.start},${clip.end}`,
      thumbnail: getVideoThumbnail(videoSrc),
      tags: clip.tags ? clip.tags.split(/\s?,\s?/g) : [],
    });

    this.setState({ ...initialState });
  }

  onEdit = (currentVideoId, videoSrc, currentClip) => {
    const newName = currentClip.name.replace(/( \/\/ .*)/g, '');
    const { clip } = this.state;
    this.setState({
      currentClipId: currentClip.id,
      currentVideoId,
      isNew: false,
      videoSrc,
      visible: true,
      clip: {
        ...clip,
        name: newName,
        tags: currentClip.tags.join(),
      },
    });
  }

  onConfirEdit = () => {
    const { onEditClip } = this.props;
    const {
      currentClipId,
      currentVideoId,
      clip,
      videoSrc,
    } = this.state;

    onEditClip(currentVideoId, currentClipId, {
      isDeleteable: true,
      isEditable: true,
      name: `${clip.name} // ${clip.start} - ${clip.end}`,
      src: `${videoSrc}#t=${clip.start},${clip.end}`,
      thumbnail: getVideoThumbnail(videoSrc),
      tags: clip.tags ? clip.tags.split(/\s?,\s?/g) : [],
    });

    this.setState({ ...initialState });
  }

  onSaveClip = (videoId, clipId) => {
    const { onSaveClip } = this.props;
    onSaveClip(videoId, clipId);
  }

  handleChangeClip = (field, value) => {
    const currentState = Object.assign({}, this.state);

    this.setState({
      ...currentState,
      clip: {
        ...currentState.clip,
        [field]: value,
      },
    });
  }

  render() {
    const {
      handleClickClip,
      onDeleteClip,
      videos,
    } = this.props;

    const {
      clip,
      isNew,
      visible,
    } = this.state;

    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    actions.push(
      <Button
        disabled={!clip.start || !clip.end}
        flat
        primary
        onClick={isNew ? this.onConfirm : this.onConfirEdit}
      >
        Confirm
      </Button>,
    );

    return (
      <VideoListContainer>
        <h2> Video List </h2>
        <section className="video-list">
          <ul>
            {
              Object.values(videos).map(video => (
                <li key={video.id}>
                  <TitleContainer>
                    <h3>
                      {video.title}
                    </h3>
                    <Button
                      icon
                      onClick={() => this.show(video.id, video.src)}
                      primary
                      tooltipLabel="add a new clip"
                      tooltipPosition="top"
                    >
                      add
                    </Button>
                  </TitleContainer>
                  <ClipList
                    clips={video.clips || []}
                    handleClick={handleClickClip}
                    videoId={video.id}
                    onDeleteClip={onDeleteClip}
                    onEditClip={currentClip => this.onEdit(
                      video.id,
                      video.src,
                      currentClip,
                    )}
                    onSaveClip={(videoId, clipId) => this.onSaveClip(videoId, clipId)}
                  />
                </li>
              ))
            }
          </ul>
        </section>
        <DialogContainer
          actions={actions}
          id="add-clip-dialog"
          onHide={this.hide}
          title={`${isNew ? 'Add new' : 'Edit'} clip`}
          visible={visible}
        >
          <TextField
            id="name"
            label="Clip Name"
            onChange={value => this.handleChangeClip('name', value)}
            placeholder="Clip Name"
            value={clip.name}
          />
          <TextField
            id="start"
            label="Clip Start"
            onChange={value => this.handleChangeClip('start', value)}
            placeholder="Clip Start"
            type="number"
            value={clip.start}
          />
          <TextField
            id="end"
            label="Clip End"
            onChange={value => this.handleChangeClip('end', value)}
            placeholder="Clip End"
            type="number"
            value={clip.end}
          />
          <TextField
            id="tags"
            label="tags"
            onChange={value => this.handleChangeClip('tags', value)}
            placeholder="example, example2"
            value={clip.tags}
          />
        </DialogContainer>
      </VideoListContainer>
    );
  }
}

VideoList.propTypes = {
  handleClickClip: PropTypes.func.isRequired,
  onCreateClip: PropTypes.func.isRequired,
  onDeleteClip: PropTypes.func.isRequired,
  onEditClip: PropTypes.func.isRequired,
  onSaveClip: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired, // eslint-disable-line
};

export default VideoList;
