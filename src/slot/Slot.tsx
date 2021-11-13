import React, { FunctionComponent, useState } from 'react';
import { displayCost } from '../app/App';
import './Slot.css';

interface ModuleProps extends SimpleModuleProps {
  isSelected: boolean,
  onSelect: () => void
}

export interface SimpleModuleProps {
  category: string,
  color?: string,
  packageDetails?: string[],
  name: string,
  cost: number
}

type SlotProps = {
  category: string,
  modules: SimpleModuleProps[],
  categorySelect: (moduleProps: SimpleModuleProps) => void
}

export const Slot: FunctionComponent<SlotProps> = ({ category, modules, categorySelect }) => {
  const [isSelected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    categorySelect(modules[index]);
  }

  const preparedModules: JSX.Element[] = modules.map((module, index) => {
    if (module.color != null) {
      return <ColorModule category={category} color={module.color} name={module.name} cost={module.cost}
              key={module.name} isSelected={isSelected === index}
              onSelect={() => {handleSelect(index)}}/>
    } else if (module.packageDetails != null) {
      return <OptionPackageModule category={category} name={module.name} packageDetails={module.packageDetails}
              cost={module.cost} key={module.name} isSelected={isSelected === index}
              onSelect={() => {handleSelect(index)}}/>
    } else {
      return <Module category={category} name={module.name} cost={module.cost}
              key={module.name} isSelected={isSelected === index}
              onSelect={() => {handleSelect(index)}}/>
    }
  });

  return (
    <article className="slot">
      <h2 className="slot-category">{ category }:</h2>
      <div className="module-container">{ preparedModules }</div>
    </article>
  );
}

const Module: FunctionComponent<ModuleProps> = ({ category, name, cost, isSelected, onSelect }) => {
  return (
    <label className={(isSelected ? "module selected" : "module")} key={name}>
      <span className="name">{name}</span>
      <input type="radio" name={category} onChange={onSelect}/>
      <span className="cost">{ displayCost(cost) }</span>
    </label>
  )
}

const ColorModule: FunctionComponent<ModuleProps> = ({ category, color, name, cost, isSelected, onSelect }) => {
  return (
    <label className={(isSelected ? "module selected" : "module")} key={name}>
      <div className="color-box" style={{ backgroundColor: color }}></div>
      <input type="radio" name={category} onChange={onSelect}/>
      <span className="cost">{ displayCost(cost) }</span>
      <span className="name">{name}</span>
    </label>
  )
}

const OptionPackageModule: FunctionComponent<ModuleProps> = ({ category, name, packageDetails, cost, isSelected, onSelect }) => {
  return (
    <label className={(isSelected ? "option-module module selected" : "option-module module")} key={name}>
      <span className="name">{name}</span>
      <input type="radio" name={category} onChange={onSelect}/>
      <div className="cost">{ cost !== 0 && displayCost(cost) }</div>
      <ul className="package-details">
        { packageDetails?.map((s, index) => <li key={ index }>{ s }</li>) }
      </ul>
    </label>
  )
}