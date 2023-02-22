import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardForm, CardHeader, CardRightContent, CardTitle, CardWrapper, Detail } from 'rt/styles/Base';
import { AddButton, CancelButton } from 'rt/styles/Elements';
import EditableLabel from 'rt/widgets/EditableLabel';

class NewCardForm extends Component {
  updateField = (field, value) => {
    this.setState({ [field]: value });
  };

  handleAdd = () => {
    this.props.onAdd(this.state);
  };

  render() {
    const { onCancel, t } = this.props;
    return (
      <CardForm>
        <CardWrapper>
          <CardHeader>
            <CardTitle>
              <EditableLabel
                autoFocus
                onChange={(val) => this.updateField('title', val)}
                placeholder={t('placeholder.title')}
              />
            </CardTitle>

            <CardRightContent>
              <EditableLabel onChange={(val) => this.updateField('label', val)} placeholder={t('placeholder.label')} />
            </CardRightContent>
          </CardHeader>

          <Detail>
            <EditableLabel
              onChange={(val) => this.updateField('description', val)}
              placeholder={t('placeholder.description')}
            />
          </Detail>
        </CardWrapper>

        <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>

        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </CardForm>
    );
  }
}

NewCardForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

NewCardForm.defaultProps = {};

export default NewCardForm;
