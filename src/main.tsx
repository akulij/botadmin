import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import 'antd/dist/reset.css';
import './index.css'

import { Chart as ChartJS, BarElement, Title } from 'chart.js';
ChartJS.register(
    BarElement,
    Title
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
