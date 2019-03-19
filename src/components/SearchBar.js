import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import history from '../history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px var(--shadow-color);
  background-color: var(--color-primary-dark);
  border: 1px solid var(--color-primary);
  width: ${props => (props.state ? '30rem' : '4rem')};
  cursor: ${props => (props.state ? 'auto' : 'pointer')};
  padding: 2rem;
  height: 4rem;
  outline: none;
  border-radius: 10rem;
  transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
`;

const Input = styled.input`
  font-size: 1.3rem;
  line-height: 1;
  font-weight: 300;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.state ? '1rem' : '0rem')};
  color: var(--text-color);
  border: none;
  transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);

  &:focus,
  &:active {
    outline: none;
  }

  &::placeholder {
    color: var(--text-color);
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.state ? 'auto' : 'none')};
  cursor: ${props => (props.state ? 'pointer' : 'none')};
  transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--text-color);
`;

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState(false);
  const node = useRef();
  const inputFocus = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // On click outside, change input state to false
  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setState(false);
  };

  function onFormSubmit(e) {
    e.preventDefault();
    if (input.length === 0) {
      console.log('invalid');
      return;
    }
    setInput('');
    history.push(`/search/${input}`);
  }

  return (
    <Form
      state={state}
      onClick={() => {
        setState(true);
        inputFocus.current.focus();
      }}
      onSubmit={onFormSubmit}
      ref={node}
    >
      <Button type="submit" state={state}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </Button>
      <Input
        onChange={e => setInput(e.target.value)}
        ref={inputFocus}
        value={input}
        state={state}
        placeholder="Search for a movie..."
      />
    </Form>
  );
};

export default SearchBar;