import React from 'react';
import PropTypes from 'prop-types';
import * as S from 'rt/styles/Base';
import autosize from 'autosize';

class InlineInput extends React.Component {
  /** @type {HTMLTextAreaElement | null} */ refInput = null;

  // apply patch
  onFocus = (event) => {
    event.target.select();
  };

  // This is the way to select all text if mouse clicked
  onMouseDown = (event) => {
    if (document.activeElement !== event.target) {
      event.preventDefault();
      this.refInput?.focus();
    }
  };

  onBlur = () => {
    if (this.refInput?.value !== this.props.value) {
      this.props.onSave(this.refInput?.value);
    }
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.refInput?.blur();
      event.preventDefault();
    }

    if (event.keyCode === 27) {
      if (this.refInput) {
        this.refInput.value = this.props.value;
      }
      this.refInput?.blur();
      event.preventDefault();
    }

    if (event.keyCode === 9) {
      if (this.refInput?.value.length === 0) {
        this.props.onCancel();
      }
      this.refInput?.blur();
      event.preventDefault();
    }
  };

  setRef = (/** @type {HTMLTextAreaElement | null} */ ref) => {
    this.refInput = ref;
    if (this.props.resize !== 'none' && this.refInput) {
      autosize(this.refInput);
    }
  };

  // apply patch
  componentDidUpdate() {
    if (this.refInput) {
      this.refInput.value = this.props.value;
    }
  }

  render() {
    const { autoFocus, border, value, placeholder, className } = this.props;

    return (
      <S.InlineInput
        ref={this.setRef}
        border={border}
        onMouseDown={this.onMouseDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        placeholder={placeholder} // apply patch
        className={className} // apply patch
        defaultValue={value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={1}
        autoFocus={autoFocus}
      />
    );
  }
}

InlineInput.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  border: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal'])
};

InlineInput.defaultProps = {
  onSave: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  resize: 'none'
};

export default InlineInput;
