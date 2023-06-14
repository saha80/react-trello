import React from 'react';
import PropTypes from 'prop-types';
import * as S from 'rt/styles/Base';
import autosize from 'autosize';

class NewLaneTitleEditor extends React.Component {
  /** @type {HTMLTextAreaElement | null} */ refInput = null;

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.refInput?.blur();
      this.props.onSave();
      event.preventDefault();
    }

    if (event.keyCode === 27) {
      this.cancel();
      event.preventDefault();
    }

    if (event.keyCode === 9) {
      if (this.value.length) {
        this.props.onSave();
      } else {
        this.cancel();
      }
      event.preventDefault();
    }
  };

  cancel = () => {
    this.value = '';
    this.props.onCancel();
    this.refInput?.blur();
  };

  get value() {
    return this.refInput ? this.refInput.value : '';
  }

  set value(newValue) {
    if (this.refInput) {
      this.refInput.value = newValue;
    }
  }

  setRef = (/** @type {HTMLTextAreaElement | null} */ ref) => {
    this.refInput = ref;
    if (this.props.resize !== 'none' && this.refInput) {
      autosize(this.refInput);
    }
  };

  render() {
    const { autoFocus, resize, border, value, placeholder } = this.props;

    return (
      <S.InlineInput
        style={{ resize }}
        ref={this.setRef}
        border={border}
        onKeyDown={this.onKeyDown}
        placeholder={value.length ? placeholder : undefined}
        defaultValue={value}
        rows={3}
        autoFocus={autoFocus}
      />
    );
  }
}

NewLaneTitleEditor.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  border: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal'])
};

NewLaneTitleEditor.defaultProps = {
  inputRef: () => {},
  onSave: () => {},
  onCancel: () => {},
  placeholder: '',
  value: '',
  border: false,
  autoFocus: false,
  resize: 'none'
};

export default NewLaneTitleEditor;
