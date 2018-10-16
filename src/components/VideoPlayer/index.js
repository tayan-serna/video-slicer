/* eslint-disable jsx-a11y/media-has-caption */
// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.video = null;
  }

  componentWillReceiveProps(nextProps) {
    const { src } = this.props;
    const { src: srcNext } = nextProps;

    if (src !== srcNext) {
      this.video.load();
      this.video.play();
    }
  }

  render() {
    const { id, src } = this.props;

    return (
      <video
        ref={(video) => { this.video = video; }}
        id={id}
        controls
        preload="metadata"
      >
        <source
          src={src}
          type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
        />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;
