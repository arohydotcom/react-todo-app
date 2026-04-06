import { useState } from 'react'
export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const add = (e) => { e.preventDefault(); if (!input.trim()) return; setTodos([...todos, { id: Date.now(), text: input, done: false }]); setInput('') }
  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = (id) => setTodos(todos.filter(t => t.id !== id))
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Todo App</h1>
      <form onSubmit={add} style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add a task..." style={{ flex: 1, padding: '.75rem', borderRadius: 8, border: '1px solid #ddd' }} />
        <button type="submit" style={{ padding: '.75rem 1.5rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600 }}>Add</button>
      </form>
      <ul style={{ listStyle: 'none' }}>
        {todos.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '1rem', background: 'white', borderRadius: 8, marginBottom: '.5rem', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : 'inherit' }}>{t.text}</span>
            <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#ef4444' }}>X</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>No tasks yet!</p>}
    </div>
  )
}