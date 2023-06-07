import React from 'react';
import PropTypes from 'prop-types';

import { LaneFooter } from 'rt/styles/Base';

import { CollapseBtn, ExpandBtn } from 'rt/styles/Elements';

const LaneFooter_ = ({ onClick, collapsed }) => (
  <LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>
);

LaneFooter_.propTypes = {
  onClick: PropTypes.func,
  collapsed: PropTypes.bool
};

export default LaneFooter_;
