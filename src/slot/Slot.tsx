import React, { FunctionComponent } from 'react';
import './Slot.css';

type ModuleProps = {
  name: string,
  cost: number,
}

type SlotProps = {
  title: string,
  modules: ModuleProps[]
}

export const Slot: FunctionComponent<SlotProps> = ({ title, modules }) => {
  // This is a bit too extra.
  const toggleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parent = event.target.parentElement;
    // TODO: Handle error
    const siblings = Array.from(parent?.parentElement?.children!);
    siblings.forEach(el => el.classList.remove("selected"));
    parent?.classList.toggle("selected");
  }

  const preparedModules: JSX.Element[] = modules.map(module => {
    const displayCost: string = module.cost >= 0 ? `+${module.cost}€` : `${module.cost}€`;

    return (
      <label className="module" key={module.name}>{module.name}
        <input type="radio" name={title} />
        <span>{ displayCost }</span>
      </label>
    )
  });

  return (
    <article className="slot">
      <h2 className="slot-title">{ title }:</h2>
      <div className="module-container" onChange={toggleSelected}>{ preparedModules }</div>
    </article>
  );
}
