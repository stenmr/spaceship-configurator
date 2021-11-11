import React, { FunctionComponent, useEffect, useState } from 'react';
import './Slot.css';

type ModuleProps = {
  title: string,
  name: string,
  cost: number,
  isSelected: any,
  onSelect: any
}

type SlotProps = {
  title: string,
  modules: {
    name: string,
    cost: number
  }[]
}

export const Slot: FunctionComponent<SlotProps> = ({ title, modules }) => {
  const [isSelected, setSelected] = useState<number | null>(null);

  const preparedModules: JSX.Element[] = modules.map((module, index) => {
    return <Module title={title} name={module.name} cost={module.cost}
              key={module.name} isSelected={isSelected === index}
              onSelect={() => setSelected(index)}/>
  });

  return (
    <article className="slot">
      <h2 className="slot-title">{ title }:</h2>
      <div className="module-container">{ preparedModules }</div>
    </article>
  );
}

export const Module: FunctionComponent<ModuleProps> = ({ title, name, cost, isSelected, onSelect }) => {
  const displayCost: string = cost >= 0 ? `+${cost}€` : `${cost}€`;

  return (
    <label className={(isSelected ? "module selected" : "module")} key={name}>{name}
      <input type="radio" name={title} onChange={onSelect}/>
      <span>{ displayCost }</span>
    </label>
  )
}