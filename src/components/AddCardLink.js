import React from 'react';
import PropTypes from 'prop-types';
import { AddCardLink } from 'rt/styles/Base';

const AddCardLink_ = ({ onClick, t }) => (
  <AddCardLink onClick={onClick}>{t('Click to add card')}</AddCardLink>
);

AddCardLink_.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func
};

export default AddCardLink_;
