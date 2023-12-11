import React from 'react';

const Landing = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Landing;