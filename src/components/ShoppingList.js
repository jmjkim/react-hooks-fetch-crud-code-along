import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
// import { response } from "msw/lib/types";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
        .then(response => response.json())
        .then(item => setItems(item))
        .catch (error => alert(error.message))
      }, [])

  function handleAddItem(newItem) {
    return setItems([...items, newItem]);
  }

  function handleUpdatedItem(updateItem) {
      const newItemList = items.map(item => {
      if (item.id === updateItem.id) return updateItem
      else return item
    })

      return setItems(newItemList);
  }

  function handleDeleteItem(deleteItem) {
    const newItemList = items.filter(item => item.id !== deleteItem.id);
    return setItems(newItemList);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} 
                item={item} 
                onUpdateItem={handleUpdatedItem}
                onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
