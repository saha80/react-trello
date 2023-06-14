import React from 'react';
import PropTypes from 'prop-types';
import InlineInput from 'rt/widgets/InlineInput';
import * as S from 'rt/styles/Base';
import LaneMenu from './LaneHeader/LaneMenu';

const LaneHeader = ({
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
  laneDraggable
}) => (
  <S.LaneHeader onDoubleClick={onDoubleClick} editLaneTitle={editLaneTitle}>
    <S.Title draggable={laneDraggable} style={titleStyle}>
      {editLaneTitle ? (
        <InlineInput
          value={title}
          border
          placeholder={t('placeholder.title')}
          resize="vertical"
          onSave={updateTitle}
        />
      ) : (
        title
      )}
    </S.Title>
    {label && (
      <S.RightContent>
        <span style={labelStyle}>{label}</span>
      </S.RightContent>
    )}
    {canAddLanes && <LaneMenu t={t} onDelete={onDelete} />}
  </S.LaneHeader>
);

LaneHeader.propTypes = {
  updateTitle: PropTypes.func,
  editLaneTitle: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  laneDraggable: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  onDelete: PropTypes.func,
  onDoubleClick: PropTypes.func,
  t: PropTypes.func.isRequired,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object
};

LaneHeader.defaultProps = {
  updateTitle: () => {},
  editLaneTitle: false,
  canAddLanes: false
};

export default LaneHeader;
