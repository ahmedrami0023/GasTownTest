# Grocery List App Specification

## Project Overview
- **Project Name**: Grocery List
- **Type**: Single-page webapp
- **Core Functionality**: A simple grocery list manager where users can add items, mark them as purchased, and delete them. Data persists in localStorage.
- **Target Users**: Anyone needing a quick, offline grocery list

## UI/UX Specification

### Layout Structure
- Single centered container (max-width: 480px)
- Vertical stack: header → input form → items list
- No responsive breakpoints needed (mobile-first design works desktop too)

### Visual Design

**Color Palette**
- Background: `#F7F5F2` (warm off-white)
- Card/Container: `#FFFFFF`
- Primary accent: `#2D5A3D` (forest green)
- Primary hover: `#1E3D29`
- Text primary: `#1A1A1A`
- Text secondary: `#6B7280`
- Purchased item text: `#9CA3AF`
- Border: `#E5E0DC`
- Danger: `#DC2626`
- Danger hover: `#B91C1C`
- Checkbox checked: `#2D5A3D`

**Typography**
- Font family: `"DM Sans", system-ui, sans-serif`
- Header: 28px, font-weight 700
- Input: 16px, font-weight 400
- Item text: 16px, font-weight 500
- Placeholder: 14px

**Spacing**
- Container padding: 24px
- Item padding: 12px 16px
- Gap between items: 8px
- Input height: 48px
- Border radius (card): 16px
- Border radius (inputs/buttons): 10px

**Visual Effects**
- Card shadow: `0 2px 12px rgba(0,0,0,0.06)`
- Button hover: slight scale (1.02) with transition
- Delete button: opacity change on hover
- Checkbox: smooth check animation
- Strikethrough animation on purchased items

### Components

**Header**
- App title "Grocery List"
- Subtitle with item count

**Input Form**
- Text input for item name (placeholder: "Add an item...")
- Add button (+ icon)
- States: default, focused, filled

**Grocery Item**
- Checkbox (custom styled)
- Item name (with strikethrough when purchased)
- Delete button (trash icon, appears on hover)
- States: default, purchased, hover

**Empty State**
- Illustrated message when no items

## Functionality Specification

### Core Features
1. **Add Item**: Type name, press Enter or click Add button
2. **Toggle Purchased**: Click checkbox to mark/unmark as purchased
3. **Delete Item**: Click delete button to remove item
4. **Persistence**: All items saved to localStorage automatically

### User Interactions
- Adding empty item not allowed (button disabled when input empty)
- Pressing Enter in input field triggers add
- Checkbox toggles immediately on click
- Delete button shows on item hover (desktop) / always visible (touch)

### Data Handling
- Item structure: `{ id: string, name: string, purchased: boolean, createdAt: number }`
- localStorage key: `grocery-items`
- Load items on app mount
- Save to localStorage on every change (add/delete/toggle)

### Edge Cases
- Empty input: prevent add
- Duplicate names: allowed (each has unique ID)
- Very long names: truncate with ellipsis
- localStorage unavailable: graceful fallback (app works in memory)

## Acceptance Criteria
- [ ] Can add new grocery items by typing and pressing Enter or clicking Add
- [ ] Can mark items as purchased by clicking checkbox (visual strikethrough)
- [ ] Can delete items by clicking delete button
- [ ] Items persist after page refresh
- [ ] Empty state shown when no items
- [ ] Clean, modern UI with warm color palette
- [ ] All interactions have smooth visual feedback