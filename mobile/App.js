// Importando o idioma pt-BR
// npm install intl
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';

import Routes from './src/routes'

export default function App() {
  return (
    <Routes />
  );
}