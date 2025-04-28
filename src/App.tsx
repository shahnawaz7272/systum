// src/App.tsx
import React from 'react';
import './App.css';
import { useEffect } from "react";
import { GameState } from './store/store';
import Map from '../pages/Map';

const App: React.FC = () => {
  const restoreState = GameState((state) => state.restoreState);

  useEffect(() => {
    restoreState();
  }, []);


  return (
    <div className="app-container">
      <Map />
    </div>
  );
};

export default App;



