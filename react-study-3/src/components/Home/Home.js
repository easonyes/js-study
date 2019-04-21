import React from 'react';
import PropTypes from 'prop-types';

const Home = (props) => (
  <div>
    <h3>Home</h3>
    {/*<h5>{props.params.name}</h5>*/}
  </div>
);

Home.propTypes = {
  params: PropTypes.object,
};

export default Home;