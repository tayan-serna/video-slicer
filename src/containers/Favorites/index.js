// @vendors
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider } from 'react-md';

// @components
import VideoPlayer from '../../components/VideoPlayer';
import ClipList from '../../components/ClipList';

// @actions
import {
  setFavoriteClip as setFavoriteClipAction,
} from '../../actions/favoritesActions';

const MainContainer = glamorous.section({
  padding: '2rem',
  width: '100%',
  textAlign: 'center',
  ' video': {
    width: '50%',
  },
  ' .video-alert': {
    color: 'red',
    fontSize: '2rem',
    padding: '5rem',
  },
});

const AdviceContainer = glamorous.section({
  padding: '2rem',
  fontSize: '2rem',
  textAlign: 'center',
});

const ClipsContainer = glamorous.section({
  textAlign: 'left',
});

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: props.favorites.currentClip.src,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { favorites: { currentClip } } = this.props;
    const { favorites: { currentClip: currentClipNext } } = nextProps;
    if (JSON.stringify(currentClip) !== JSON.stringify(currentClipNext)) {
      this.setState({
        currentVideo: currentClipNext.src,
      });
    }
  }

  handleClickClip = (data) => {
    const { setFavoriteClip } = this.props;
    setFavoriteClip(data);
  }

  render() {
    const {
      dashboard,
    } = this.props;
    const { currentVideo } = this.state;

    const favoriteClips = [];
    const videoClips = Object.values(dashboard.videoClips);
    videoClips.forEach((video) => {
      video.clips.forEach((clip) => {
        if (clip.isFavorite) {
          favoriteClips.push(clip);
        }
      });
    });

    return (
      <MainContainer>
        {currentVideo
          ? <VideoPlayer id="favorites-player" src={currentVideo} />
          : <div className="video-alert">There is not a select clip, please select one</div>
        }
        <Divider />
        <ClipsContainer>
          {
            favoriteClips.length
              ? (
                <ClipList
                  clips={favoriteClips}
                  handleClick={this.handleClickClip}
                  onlyView
                />
              )
              : (
                <AdviceContainer>You have not saved clips</AdviceContainer>
              )
          }
        </ClipsContainer>
      </MainContainer>
    );
  }
}

Favorite.propTypes = {
  dashboard: PropTypes.shape({
    videoClips: PropTypes.object,
  }).isRequired,
  favorites: PropTypes.shape({
    currentClip: PropTypes.object,
  }).isRequired,
  setFavoriteClip: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dashboard, favorites }) => ({
  dashboard,
  favorites,
});

const mapDispatchToProps = dispatch => ({
  setFavoriteClip: data => dispatch(setFavoriteClipAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
