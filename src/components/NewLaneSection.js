import React from 'react'
import PropTypes from 'prop-types'
import {NewLaneSection} from 'rt/styles/Base'
import {AddLaneLink} from 'rt/styles/Elements'

const NewLaneSection_ = ({t, onClick}) => (
  <NewLaneSection>
    <AddLaneLink t={t} onClick={onClick}>
      {t('Add another lane')}
    </AddLaneLink>
  </NewLaneSection>
)

NewLaneSection_.propTypes = {
  t: PropTypes.func,
  onClick: PropTypes.func
}

export default NewLaneSection_
