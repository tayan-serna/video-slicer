// @vendors
import React, { Component, Fragment } from 'react';
import { Toolbar } from 'react-md';
import { Switch, Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

// @components
import Dashboard from '../Dashboard';
import Favorites from '../Favorites';
import KebabMenu from '../../components/KebabMenu';

const LiContainer = glamorous.li({
  padding: '.5rem',
  ' a': {
    textDecoration: 'none',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { location } = this.props;
    return (
      <Fragment>
        <Toolbar
          actions={
            (
              <KebabMenu
                id="toolbar-themed-kebab-menu"
                menuItems={[
                  <LiContainer key="1">
                    <Link to="/">Dashboard</Link>
                  </LiContainer>,
                  <LiContainer key="2">
                    <Link to="/my-videos">Favorites</Link>
                  </LiContainer>,
                ]}
              />
            )
          }
          colored
          title="Video Slicer"
        />
        <Switch key={location.pathname}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/my-videos" component={Favorites} />
        </Switch>
      </Fragment>
    );
  }
}

Home.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(Home);
