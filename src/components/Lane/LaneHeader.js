import React from 'react';
import PropTypes from 'prop-types';
import InlineInput from 'rt/widgets/InlineInput';
import { LaneHeader, RightContent, Title } from 'rt/styles/Base';
import LaneMenu from './LaneHeader/LaneMenu';

function LaneHeaderComponent({
  updateTitle,
  canAddLanes,
  onDelete,
  onDoubleClick,
  editLaneTitle,
  label,
  title,
  titleStyle,
  labelStyle,
  t,
  laneDraggable,
}) {
  return (
    <LaneHeader editLaneTitle={editLaneTitle} onDoubleClick={onDoubleClick}>
      <Title draggable={laneDraggable} style={titleStyle}>
        {editLaneTitle ? (
          <InlineInput
            border
            onSave={updateTitle}
            placeholder={t('placeholder.title')}
            resize="vertical"
            value={title}
          />
        ) : (
          title
        )}
      </Title>

      {label ? (
        <RightContent>
          <span style={labelStyle}>{label}</span>
        </RightContent>
      ) : null}

      {canAddLanes ? <LaneMenu onDelete={onDelete} t={t} /> : null}
    </LaneHeader>
  );
}

LaneHeaderComponent.propTypes = {
  canAddLanes: PropTypes.bool,
  editLaneTitle: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  laneDraggable: PropTypes.bool,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  updateTitle: PropTypes.func,
};

LaneHeaderComponent.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false,
};

export default LaneHeaderComponent;
