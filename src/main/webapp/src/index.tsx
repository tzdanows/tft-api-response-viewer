import React from 'react'
import { createRoot } from 'react-dom/client'
import TFTApiDisplay from './components/TFTApiDisplay'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <TFTApiDisplay />
  </React.StrictMode>
)