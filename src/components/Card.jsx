import React from 'react';
import './App.css';

function Card({ number }) {
  return (
    <div className="uno-card">
      <div className="card-inner">
        <div className="front">
          <div className="front-bg"></div>
          <span className="card-number">{number}</span>
        </div>
        <div className="back">
          <div className="back-bg"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const cards = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col">
      {cards.map((number) => (
        <Card key={number} number={number} />
      ))}
    </div>
  );
}

export default App;
