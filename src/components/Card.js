import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardHeader, CardRightContent, CardTitle, Detail, Footer, MovableCardWrapper } from 'rt/styles/Base';
import InlineInput from 'rt/widgets/InlineInput';
import Tag from './Card/Tag';
import DeleteButton from 'rt/widgets/DeleteButton';

class Card extends Component {
  onDelete = (e) => {
    this.props.onDelete();
    e.stopPropagation();
  };

  render() {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
      t,
    } = this.props;

    const updateCard = (card) => {
      onChange({ ...card, id });
    };

    return (
      <MovableCardWrapper className={className} data-id={id} onClick={onClick} style={style}>
        <CardHeader>
          <CardTitle draggable={cardDraggable}>
            {editable ? (
              <InlineInput
                border
                onSave={(value) => updateCard({ title: value })}
                placeholder={t('placeholder.title')}
                resize="vertical"
                value={title}
              />
            ) : (
              title
            )}
          </CardTitle>

          <CardRightContent>
            {editable ? (
              <InlineInput
                border
                onSave={(value) => updateCard({ label: value })}
                placeholder={t('placeholder.label')}
                resize="vertical"
                value={label}
              />
            ) : (
              label
            )}
          </CardRightContent>

          {showDeleteButton ? <DeleteButton onClick={this.onDelete} /> : null}
        </CardHeader>

        <Detail>
          {editable ? (
            <InlineInput
              border
              onSave={(value) => updateCard({ description: value })}
              placeholder={t('placeholder.description')}
              resize="vertical"
              value={description}
            />
          ) : (
            description
          )}
        </Detail>

        {tags && tags.length > 0 ? (
          <Footer>
            {tags.map((tag) => (
              <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </Footer>
        ) : null}
      </MovableCardWrapper>
    );
  }
}

Card.propTypes = {
  cardDraggable: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  editable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  style: PropTypes.object,
  t: PropTypes.func,
  tagStyle: PropTypes.object,
  tags: PropTypes.array,
  title: PropTypes.string.isRequired,
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
  className: '',
};

export default Card;
