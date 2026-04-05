import { useState, useEffect } from 'react'

const STORAGE_KEY = 'grocery-items'
const THEME_KEY = 'theme'

function App() {
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      return saved === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', isDark)
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    } catch (e) {
      console.warn('Could not save theme to localStorage')
    }
  }, [isDark])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.warn('Could not load items from localStorage')
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('Could not save items to localStorage')
    }
  }, [items])

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

  const purchasedCount = items.filter((item) => item.purchased).length

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">Grocery List</h1>
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
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

export default App