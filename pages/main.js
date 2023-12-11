import fs from 'fs';
import path from 'path';
import React from 'react';

const Landing = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'pages', 'landing.html');
  const content = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      content,
    },
  };
}

export default Landing;