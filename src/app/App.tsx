import React from 'react';
import { Configurator } from '../configurator/Configurator';
import { Slot } from '../slot/Slot';
import './App.css';

function App() {
  return (
    <main className="App">
      <Configurator>
        {/* <Slot title="Select color">

        </Slot> */}
        <Slot title="Select power" modules={[
          {name: "100 MW", cost: 0},
          {name: "150 MW", cost: 200},
          {name: "200 MW", cost: 500}
        ]}/>
        <Slot title="Warp drive" modules={[
          {name: "NO", cost: 0},
          {name: "YES", cost: 1000}
        ]}/>
        {/* <Slot title="Select option package">

        </Slot> */}
      </Configurator>
    </main>
  );
}

export default App;
