import React from 'react';
import PropTypes from 'prop-types';
import { TagSpan } from 'rt/styles/Base';

const Tag = ({ title, color = 'white', bgcolor = 'orange', tagStyle, ...otherProps }) => (
  <TagSpan style={{ color, backgroundColor: bgcolor, ...tagStyle }} {...otherProps}>
    {title}
  </TagSpan>
);

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  tagStyle: PropTypes.object
};

export default Tag;
