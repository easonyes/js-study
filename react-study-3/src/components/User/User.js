import React from 'react';
import PropTypes from 'prop-types';

const User = (props) => (
  <div>
    <h3>User</h3>
    {/*<h5>{props.params.name}</h5>*/}
  </div>
);

User.propTypes = {
  params: PropTypes.object,
};

export default User;