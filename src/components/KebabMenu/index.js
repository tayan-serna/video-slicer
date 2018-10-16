// @vendors
import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton } from 'react-md';

const KebabMenu = ({ id, className, menuItems }) => (
  <MenuButton
    id={id}
    icon
    className={className}
    menuItems={menuItems}
    position="br"
  >
    more_vert
  </MenuButton>
);

KebabMenu.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  menuItems: PropTypes.array, // eslint-disable-line
};

KebabMenu.defaultProps = {
  className: '',
  menuItems: [],
};

export default KebabMenu;
