import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'rt/styles/Base';

const AddCardLink = ({ onClick, t }) => (
  <S.AddCardLink onClick={onClick}>{t('Click to add card')}</S.AddCardLink>
);

AddCardLink.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func
};

export default AddCardLink;
