import React from 'react';
import PropTypes from 'prop-types';

const LocationPathName = () => (
  window.location.pathname
);

const Repos = (props) => (
  <div>
    <h3>Repos</h3>
    <h5>{LocationPathName()}</h5>
    {/*<h5>{props.params.name}</h5>*/}
  </div>
);

Repos.propTypes = {
  params: PropTypes.object,
  name: PropTypes.string,
};

export default Repos;