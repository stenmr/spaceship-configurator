import React, { FunctionComponent, useState } from 'react';
import './Slot.css';

type ModuleProps = {
  title: string,
  name: string,
  cost: number,
  isSelected: boolean,
  onSelect: () => void
}

export type PseudoModuleProps = {
  category: string,
  name: string,
  cost: number
}

type SlotProps = {
  title: string,
  modules: PseudoModuleProps[],
  categorySelect: (moduleProps: PseudoModuleProps) => void
}

export const Slot: FunctionComponent<SlotProps> = ({ title, modules, categorySelect }) => {
  const [isSelected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    categorySelect(modules[index]);
  }

  const preparedModules: JSX.Element[] = modules.map((module, index) => {
    return <Module title={title} name={module.name} cost={module.cost}
              key={module.name} isSelected={isSelected === index}
              onSelect={() => {handleSelect(index)}}/>
  });

  return (
    <article className="slot">
      <h2 className="slot-title">{ title }:</h2>
      <div className="module-container">{ preparedModules }</div>
    </article>
  );
}

const Module: FunctionComponent<ModuleProps> = ({ title, name, cost, isSelected, onSelect }) => {
  const displayCost: string = cost >= 0 ? `+${cost}€` : `${cost}€`;

  return (
    <label className={(isSelected ? "module selected" : "module")} key={name}>{name}
      <input type="radio" name={title} onChange={onSelect}/>
      <span>{ displayCost }</span>
    </label>
  )
}