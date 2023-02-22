import React from 'react';
import PropTypes from 'prop-types';
import { NewLaneSection } from 'rt/styles/Base';
import { AddLaneLink } from 'rt/styles/Elements';

function NewLaneSectionWrapper({ t, onClick }) {
  return (
    <NewLaneSection>
      <AddLaneLink onClick={onClick} t={t}>
        {t('Add another lane')}
      </AddLaneLink>
    </NewLaneSection>
  );
}

NewLaneSectionWrapper.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func,
};

export default NewLaneSectionWrapper;
