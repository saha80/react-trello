import React from 'react';
import PropTypes from 'prop-types';

import { AddCardLink } from 'rt/styles/Base';

function AddCardLinkWrapper({ onClick, t }) {
  return <AddCardLink onClick={onClick}>{t('Click to add card')}</AddCardLink>;
}

AddCardLinkWrapper.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func,
};

export default AddCardLinkWrapper;
