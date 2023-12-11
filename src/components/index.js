import { Image, Layout, Card, Typography, Row, Col } from 'antd'
import React from 'react';

const LandingPage = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export async function getServerSideProps() {
  // Use fs.readFileSync para ler o arquivo HTML (requer módulo fs)
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'src/pages/landing.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');

  return {
    props: {
      htmlContent,
    },
  };
}

export default LandingPage;
