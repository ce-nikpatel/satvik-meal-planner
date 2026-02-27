import React from 'react';

function GroceryList({ list }) {
  if (list.length === 0) return null;

  const parseItem = (item) => {
    const match = item.match(/^(.*?)(?:\s+x(\d+))?$/);
    return {
      name: match?.[1]?.trim() || item,
      qty: match?.[2] ? `x${match[2]}` : '',
    };
  };

  return (
    <div className="grocery-list card">
      <h2>Grocery List</h2>
      <ul className="grocery-items">
        {list.map((item, idx) => {
          const parsed = parseItem(item);
          return (
            <li key={idx} className="grocery-item">
              <span className="item-name">{parsed.name}</span>
              {parsed.qty && <span className="item-qty">{parsed.qty}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroceryList;
