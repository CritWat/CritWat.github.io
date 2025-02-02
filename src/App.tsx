import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
// import { Router } from './Router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { theme } from './theme';
import {Header} from "./components/Header.tsx";
import {HomePage} from "./views/Home.page.tsx";
import Models from "./components/ModelViewer/Models.tsx";

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <Router>
                <div className="app"></div>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/models" element={<Models/>} />
                </Routes>
            </Router>
        </MantineProvider>
    );
}