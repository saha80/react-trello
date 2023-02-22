import React from 'react';
import PropTypes from 'prop-types';

import { LaneFooter } from 'rt/styles/Base';

import { CollapseBtn, ExpandBtn } from 'rt/styles/Elements';

function LaneFooterWrapper({ onClick, collapsed }) {
  return <LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>;
}

LaneFooterWrapper.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LaneFooterWrapper;
