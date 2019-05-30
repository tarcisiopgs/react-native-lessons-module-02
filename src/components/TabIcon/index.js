import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const TabIcon = ({ tintColor, name }) => (
  <Icon name={name} size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TabIcon;
