# Zustandda data type’lar bilan ishlash

Zustand store’da turli xil data type’lar bilan ishlash:

- **Primitive state**

  - number
  - string
  - boolean
- **Reference state**

  - object
  - array
- **Nested state**

  - ichma-ich joylashgan object’lar
- Ushbu state’larni **store’da boshqarish**
- Va ularni **React component ichida chaqirish**

---

## Primitive state bilan ishlash

Primitive state — bu  **oddiy qiymatlar** : ` number`, `string`, `boolean`.

#### Store

```
import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  isActive: false,

  increment: () =>
    set((state) => ({ count: state.count + 1 })),

  toggleActive: () =>
    set((state) => ({ isActive: !state.isActive })),
}))

```

#### Component ichida ishlatish

```
function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)

  return <button onClick={increment}>{count}</button>
}

```

---

## Reference state bilan ishlash

Reference state — bu **object** va **array** tipidagi ma’lumotlar.

#### Object Store

```
import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    name: 'Ali',
    age: 20,
  },

  updateName: (name) =>
    set((state) => ({
      user: {
        ...state.user,
        name,
      },
    })),
}))

```

#### Object Store'ni component ichida ishlatish

```
function UserProfile() {
  const name = useUserStore((state) => state.user.name)
  const updateName = useUserStore((state) => state.updateName)

  return <button onClick={() => updateName('Vali')}>{name}</button>
}

```

---

#### Array Store

```
const useTodoStore = create((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, text],
    })),

  removeTodo: (index) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    })),
}))

```

#### Array Store'ni component ichida ishlatish

```
function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const addTodo = useTodoStore((state) => state.addTodo)

  return (
    <button onClick={() => addTodo('New task')}>
      {todos.length}
    </button>
  )
}

```

## Nested object state bilan ishlash

Nested state — bu  **ichma-ich joylashgan object.**

#### Nested object store

```
import { create } from 'zustand'

const useProfileStore = create((set) => ({
  profile: {
    user: {
      name: 'Ali',
      age: 25,
    },
    settings: {
      theme: 'light',
      language: 'en',
    },
  },

  updateUserName: (name) =>
    set((state) => ({
      profile: {
        ...state.profile,
        user: {
          ...state.profile.user,
          name,
        },
      },
    })),

  updateTheme: (theme) =>
    set((state) => ({
      profile: {
        ...state.profile,
        settings: {
          ...state.profile.settings,
          theme,
        },
      },
    })),
}))

```

> ⚠️ Nested state update qilishda har doim oldingi state ni spread operatori orqali yoyib yuborish kerak.
>
> Aks holatda data yo'qolishi, state buzilish holatlari kuzatiladi.

#### Nested object store'ni componentda ishlatish

```
function Profile() {
  const name = useProfileStore((state) => state.profile.user.name)
  const theme = useProfileStore((state) => state.profile.settings.theme)
  const updateTheme = useProfileStore((state) => state.updateTheme)

  return <button onClick={() => updateTheme('dark')}>{name} - {theme}</button>
}

```
