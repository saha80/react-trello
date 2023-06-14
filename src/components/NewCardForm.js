import React from 'react';
import PropTypes from 'prop-types';
import * as S from 'rt/styles/Base';
import { AddButton, CancelButton } from 'rt/styles/Elements';
import EditableLabel from 'rt/widgets/EditableLabel';

class NewCardForm extends React.Component {
  onTitleChange = (title) => this.setState({ title });

  onLabelChange = (label) => this.setState({ label });

  onDescriptionChange = (description) => this.setState({ description });

  handleAdd = () => {
    this.props.onAdd(this.state);
  };

  render() {
    const { onCancel, t } = this.props;

    return (
      <S.CardForm>
        <S.CardWrapper>
          <S.CardHeader>
            <S.CardTitle>
              <EditableLabel
                placeholder={t('placeholder.title')}
                onChange={this.onTitleChange}
                autoFocus
              />
            </S.CardTitle>
            <S.CardRightContent>
              <EditableLabel placeholder={t('placeholder.label')} onChange={this.onLabelChange} />
            </S.CardRightContent>
          </S.CardHeader>
          <S.Detail>
            <EditableLabel
              placeholder={t('placeholder.description')}
              onChange={this.onDescriptionChange}
            />
          </S.Detail>
        </S.CardWrapper>
        <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
        <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      </S.CardForm>
    );
  }
}

NewCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default NewCardForm;
