// @vendors
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider } from 'react-md';

// @components
import VideoPlayer from '../../components/VideoPlayer';
import VideoList from '../../components/VideoList';

// @actions
import {
  deleteVideoClip as deleteVideoClipAction,
  editVideoClip as editVideoClipAction,
  saveVideoClip as saveVideoClipAction,
  getClip as getClipAction,
} from '../../actions/dashboardActions';

import { saveFavoriteClip as saveFavoriteClipAction } from '../../actions/favoritesActions';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: props.dashboard.currentClip.src,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dashboard: { currentClip } } = this.props;
    const { dashboard: { currentClip: currentClipNext } } = nextProps;
    if (JSON.stringify(currentClip) !== JSON.stringify(currentClipNext)) {
      this.setState({
        currentVideo: currentClipNext.src,
      });
    }
  }

  handleClickClip = (videoId, clipId) => {
    const { getClip } = this.props;
    getClip(videoId, clipId);
  }

  onCreateClip = (videoId, data) => {
    const { saveVideoClip } = this.props;
    saveVideoClip(videoId, data);
  }

  onEditClip = (videoId, clipId, data) => {
    const { editVideoClip } = this.props;
    editVideoClip(videoId, clipId, data);
  }

  onDeleteClip = (videoId, clipId) => {
    const { deleteVideoClip } = this.props;
    deleteVideoClip(videoId, clipId);
  }

  onSaveClip = (videoId, clipId) => {
    const { saveFavoriteClip } = this.props;
    saveFavoriteClip(videoId, clipId);
  }

  render() {
    const {
      dashboard,
    } = this.props;

    const { currentVideo } = this.state;

    return (
      <MainContainer>
        {currentVideo
          ? <VideoPlayer id="dashboard-player" src={currentVideo} />
          : <div className="video-alert">There is not a select clip, please select one</div>
        }
        <Divider />
        <VideoList
          handleClickClip={this.handleClickClip}
          onCreateClip={this.onCreateClip}
          onDeleteClip={this.onDeleteClip}
          onEditClip={this.onEditClip}
          onSaveClip={this.onSaveClip}
          videos={dashboard.videoClips}
        />
      </MainContainer>
    );
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.shape({
    currentClip: PropTypes.object,
    currentVideo: PropTypes.object,
    videoClips: PropTypes.object,
  }).isRequired,
  deleteVideoClip: PropTypes.func.isRequired,
  editVideoClip: PropTypes.func.isRequired,
  getClip: PropTypes.func.isRequired,
  saveVideoClip: PropTypes.func.isRequired,
  saveFavoriteClip: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
  dashboard,
});

const mapDispatchToProps = dispatch => ({
  deleteVideoClip: (videoId, clipId) => dispatch(deleteVideoClipAction(videoId, clipId)),
  editVideoClip: (videoId, clipId, data) => dispatch(editVideoClipAction(videoId, clipId, data)),
  getClip: (videoId, clipId) => dispatch(getClipAction(videoId, clipId)),
  saveVideoClip: (id, data) => dispatch(saveVideoClipAction(id, data)),
  saveFavoriteClip: (videoId, clipId) => dispatch(saveFavoriteClipAction(videoId, clipId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
