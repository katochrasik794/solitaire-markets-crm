# Font Style Guide

## Default Font Settings

**Font Family:** Roboto, sans-serif  
**Base Font Size:** 16px  
**Font Weight:** 400 (normal) - NOT bold  
**Text Color:** #4B5156

## Usage Rules

1. **Default Weight:** Always use `fontWeight: '400'` (normal) unless specifically asked for bold
2. **Font Size:** Use 16px as base, adjust only when needed
3. **Font Family:** Always use 'Roboto, sans-serif'
4. **Buttons:** Never use bold unless explicitly requested
5. **Headings:** Use normal weight (400) unless user asks for bold

## When to Use Bold

- Only when user explicitly requests bold text
- Do NOT use bold by default

## Examples

```jsx
// ✅ Correct - Normal weight
style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '400' }}

// ❌ Wrong - Don't use bold unless asked
style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', fontWeight: '700' }}
```

