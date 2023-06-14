import React from 'react';
import PropTypes from 'prop-types';

class EditableLabel extends React.Component {
  state = { value: this.props.value };

  /** @type {React.RefObject<HTMLDivElement>} */ refDiv = React.createRef();

  onInput = (event) => this.setState({ value: event.target.innerText });

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refDiv.current?.focus();
    }
  }

  onBlur = () => {
    this.props.onChange(this.state.value);
  };

  onPaste = (event) => {
    event.preventDefault();
    document.execCommand('insertText', false, event.clipboardData.getData('text'));
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.onChange(this.state.value);
      this.refDiv.current?.blur();
      event.preventDefault();
    }

    if (event.keyCode === 27) {
      if (this.refDiv.current) {
        // @ts-ignore // fixme
        this.refDiv.current.value = this.props.value;
      }
      this.setState({ value: this.props.value });
      event.preventDefault();
      event.stopPropagation();
    }
  };

  render() {
    const placeholder = this.props.value.length > 0 ? false : this.props.placeholder;
    return (
      <div
        ref={this.refDiv}
        contentEditable="true"
        className={[
          'comPlainTextContentEditable',
          !this.state.value && 'comPlainTextContentEditable--has-placeholder'
        ]
          .filter(Boolean)
          .join(' ')}
        onPaste={this.onPaste}
        onBlur={this.onBlur}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        placeholder={placeholder}
      />
    );
  }
}

EditableLabel.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.string
};

EditableLabel.defaultProps = {
  onChange: () => {},
  placeholder: '',
  autoFocus: false,
  value: ''
};

export default EditableLabel;
