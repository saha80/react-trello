import React from 'react';
import PropTypes from 'prop-types';
import { LaneTitle, NewLaneButtons, Section } from 'rt/styles/Base';
import { AddButton, CancelButton } from 'rt/styles/Elements';
import NewLaneTitleEditor from 'rt/widgets/NewLaneTitleEditor';
import { v4 as uuidv4 } from 'uuid';

class NewLaneForm extends React.Component {
  /** @type {React.RefObject<NewLaneTitleEditor>} */ ref = React.createRef();

  handleSubmit = () => {
    this.props.onAdd({
      id: uuidv4(),
      title: this.ref.current?.value
    });
  };

  render() {
    const { onCancel, t } = this.props;

    return (
      <Section>
        <LaneTitle>
          <NewLaneTitleEditor
            ref={this.ref}
            placeholder={t('placeholder.title')}
            onCancel={onCancel}
            onSave={this.handleSubmit}
            resize="vertical"
            border
            autoFocus
          />
        </LaneTitle>
        <NewLaneButtons>
          <AddButton onClick={this.handleSubmit}>{t('button.Add lane')}</AddButton>
          <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
        </NewLaneButtons>
      </Section>
    );
  }
}

NewLaneForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default NewLaneForm;
