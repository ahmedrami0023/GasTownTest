'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'grocery-items'

export default function Home() {
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.warn('Could not load items from localStorage')
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('Could not save items to localStorage')
    }
  }, [items, isLoaded])

  const addItem = () => {
    const name = newItemName.trim()
    if (!name) return

    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      purchased: false,
      createdAt: Date.now(),
    }

    setItems([...items, newItem])
    setNewItemName('')
  }

  const togglePurchased = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    )
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Grocery List</h1>
        <p className="app-subtitle">
          {items.length === 0
            ? 'No items yet'
            : `${items.length} item${items.length === 1 ? '' : 's'}`}
        </p>
      </header>

      <div className="input-form">
        <input
          type="text"
          className="input-field"
          placeholder="Add an item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="add-button"
          onClick={addItem}
          disabled={!newItemName.trim()}
          aria-label="Add item"
        >
          +
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p className="empty-title">Your list is empty</p>
          <p className="empty-text">Add items above to get started</p>
        </div>
      ) : (
        <ul className="items-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`grocery-item ${item.purchased ? 'purchased' : ''}`}
            >
              <button
                className={`checkbox ${item.purchased ? 'checked' : ''}`}
                onClick={() => togglePurchased(item.id)}
                aria-label={item.purchased ? 'Mark as not purchased' : 'Mark as purchased'}
              >
                <span className="checkbox-mark">✓</span>
              </button>
              <span className="item-name">{item.name}</span>
              <button
                className="delete-button"
                onClick={() => deleteItem(item.id)}
                aria-label="Delete item"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}