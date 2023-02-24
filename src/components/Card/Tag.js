import React from 'react';
import PropTypes from 'prop-types';
import { TagSpan } from 'rt/styles/Base';

const Tag = (props) => {
  const { title, color, bgcolor, tagStyle, ...otherProps } = props;
  const style = { color: color || 'white', backgroundColor: bgcolor || 'orange', ...tagStyle };
  return (
    <TagSpan style={style} {...otherProps}>
      {title}
    </TagSpan>
  );
};

Tag.propTypes = {
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  tagStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default Tag;
