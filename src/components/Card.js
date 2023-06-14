import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'rt/styles/Base';

import InlineInput from 'rt/widgets/InlineInput';
import DeleteButton from 'rt/widgets/DeleteButton';

import Tag from './Card/Tag';

class Card extends React.Component {
  onTitleSave = (title) => {
    this.props.onChange({ title, id: this.props.id });
  };

  onLabelSave = (label) => {
    this.props.onChange({ label, id: this.props.id });
  };

  onDelete = (event) => {
    this.props.onDelete();
    event.stopPropagation();
  };

  onDescriptionSave = (description) => {
    this.props.onChange({ description, id: this.props.id });
  };

  render() {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
      t
    } = this.props;

    return (
      <S.MovableCardWrapper data-id={id} onClick={onClick} style={style} className={className}>
        <S.CardHeader>
          <S.CardTitle draggable={cardDraggable}>
            {editable ? (
              <InlineInput
                value={title}
                border
                placeholder={t('placeholder.title')}
                resize="vertical"
                onSave={this.onTitleSave}
              />
            ) : (
              title
            )}
          </S.CardTitle>
          <S.CardRightContent>
            {editable ? (
              <InlineInput
                value={label}
                border
                placeholder={t('placeholder.label')}
                resize="vertical"
                onSave={this.onLabelSave}
              />
            ) : (
              label
            )}
          </S.CardRightContent>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
        </S.CardHeader>
        <S.Detail>
          {editable ? (
            <InlineInput
              value={description}
              border
              placeholder={t('placeholder.description')}
              resize="vertical"
              onSave={this.onDescriptionSave}
            />
          ) : (
            description
          )}
        </S.Detail>
        {tags?.length ? (
          <S.Footer>
            {tags.map((tag) => (
              <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </S.Footer>
        ) : null}
      </S.MovableCardWrapper>
    );
  }
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  cardDraggable: PropTypes.bool,
  editable: PropTypes.bool,
  t: PropTypes.func
};

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: ''
};

export default Card;
