import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'rt/styles/Base';

import { CollapseBtn, ExpandBtn } from 'rt/styles/Elements';

const LaneFooter = ({ onClick, collapsed }) => (
  <S.LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</S.LaneFooter>
);

LaneFooter.propTypes = {
  onClick: PropTypes.func,
  collapsed: PropTypes.bool
};

export default LaneFooter;
