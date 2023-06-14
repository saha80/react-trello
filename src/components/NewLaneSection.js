import React from 'react';
import PropTypes from 'prop-types';
import * as S from 'rt/styles/Base';
import { AddLaneLink } from 'rt/styles/Elements';

const NewLaneSection = ({ t, onClick }) => (
  <S.NewLaneSection>
    <AddLaneLink onClick={onClick}>{t('Add another lane')}</AddLaneLink>
  </S.NewLaneSection>
);

NewLaneSection.propTypes = {
  t: PropTypes.func,
  onClick: PropTypes.func
};

export default NewLaneSection;
