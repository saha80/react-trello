import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LaneTitle, NewLaneButtons, Section } from 'rt/styles/Base';
import { AddButton, CancelButton } from 'rt/styles/Elements';
import NewLaneTitleEditor from 'rt/widgets/NewLaneTitleEditor';
import { v1 as uuidv1 } from 'uuid';

class NewLane extends Component {
  handleSubmit = () => {
    this.props.onAdd({
      id: uuidv1(),
      title: this.getValue(),
    });
  };

  getValue = () => this.refInput.getValue();

  onClickOutside = (a, b, c) => {
    if (this.getValue().length > 0) {
      this.handleSubmit();
    } else {
      this.props.onCancel();
    }
  };

  render() {
    const { onCancel, t } = this.props;
    return (
      <Section>
        <LaneTitle>
          <NewLaneTitleEditor
            autoFocus
            border
            onCancel={this.props.onCancel}
            onSave={this.handleSubmit}
            placeholder={t('placeholder.title')}
            ref={(ref) => (this.refInput = ref)}
            resize="vertical"
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

NewLane.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NewLane.defaultProps = {};

export default NewLane;
