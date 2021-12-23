import React from 'react';
import Autocomplete from 'accessible-autocomplete/react';
import debounce from 'lodash.debounce';
import axios from 'axios';

import { PORTS_URL } from '@constants/ApiConstants';
import Auth from '@lib/Auth';

const source = debounce((query, populateResults) => {
  if (query.length < 3) {
    return;
  }
  axios.get(`${PORTS_URL}?name=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => {
      populateResults(resp.data.data);
    })
    .catch((err) => {
      if (err.response) {
        populateResults([]);
      }
    });
}, 300);

function inputTemplate(result) {
  if (!result) {
    return;
  }
  if (typeof result !== 'object') {
    return result;
  }
  return result.unlocode || 'ZZZD';
}

function suggestionTemplate(result) {
  if (!result) {
    return;
  }
  if (typeof result !== 'object') {
    return result;
  }
  const { name, unlocode } = result;
  return unlocode ? `${name} (${unlocode})` : name;
}

const PortField = ({ onConfirm = () => {}, defaultValue = '', ...props }) => {
  return (
    <Autocomplete
      source={source}
      onConfirm={onConfirm}
      showNoOptionsFound={false}
      minLength={3}
      defaultValue={defaultValue || ''}
      templates={{
        inputValue: inputTemplate,
        suggestion: suggestionTemplate,
      }}
      {...props}
    />
  );
};

export default PortField;
