import React, { Component, ChangeEvent } from 'react';
import './PasswordGenerator.css';

interface State {
  password: string;
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
}

class PasswordGenerator extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      password: '',
      length: 8,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialChars: false,
    };
  }

  // Event handlers to update state
  handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ length: parseInt(e.target.value) });
  };

  handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked } as unknown as Pick<State, keyof State>);
  };

  generatePassword = () => {
    // Generate the password based on state options
    // Update this logic based on your requirements
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (this.state.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.state.includeNumbers) charset += '0123456789';
    if (this.state.includeSpecialChars) charset += '!@#$%^&*';

    let password = '';
    for (let i = 0; i < this.state.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    this.setState({ password });
  };

  render() {
    return (
      <div className="password-generator-container">
        <div className="password-input">
          <label>Password Length:</label>
          <input
            type="number"
            className="password-length"
            value={this.state.length}
            onChange={this.handleLengthChange}
          />
        </div>
        <div className="checkboxes-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox"
              name="includeUppercase"
              checked={this.state.includeUppercase}
              onChange={this.handleCheckboxChange}
            />
            Include Uppercase
          </label>
        </div>
        <div className="checkboxes-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox"
              name="includeNumbers"
              checked={this.state.includeNumbers}
              onChange={this.handleCheckboxChange}
            />
            Include Numbers
          </label>
        </div>
        <div className="checkboxes-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox"
              name="includeSpecialChars"
              checked={this.state.includeSpecialChars}
              onChange={this.handleCheckboxChange}
            />
            Include Specialcharacters
          </label>
        </div>
        {/* Add similar checkboxes for other character types */}
        <button className="generate-password" onClick={this.generatePassword}>
          Generate Password
        </button>
        <div className="generated-password">
          Generated Password:{' '}
          <span id="output-password">{this.state.password}</span>
        </div>
      </div>
    );
  }
}

export default PasswordGenerator;
