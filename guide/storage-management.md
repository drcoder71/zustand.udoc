    

## Persist bilan storage’lar bilan ishlash

Zustand’da **persist middleware** state’ni browser storage’da saqlash uchun ishlatiladi.
Page reload bo‘lsa ham, state **yo‘qolmaydi**.

---

### Persist middleware nima qiladi?

- State’ni `localStorage` yoki `sessionStorage` ga yozadi
- Reload’dan keyin state’ni qayta tiklaydi
- Auth, theme, settings uchun qulay

---

## LocalStorage bilan ishlash	

### Store yaratish (persist + localStorage)

```js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

* `persist` → middleware
* `name` → storage key
* Default storage → `localStorage`

---

## SessionStorage bilan ishlash

```js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
```

---

## Faqat kerakli state’ni saqlash (partialize)

```js
persist(
  (set) => ({
    user: null,
    token: null,
    isLoading: false,
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      token: state.token,
    }),
  }
)
```

Bu holatda `isLoading` storage’ga yozilmaydi.

---

## Storage’ni tozalash

```js
useAuthStore.persist.clearStorage()
```

## Qachon persist ishlatish kerak?

**Ishlatiladi:**

* Auth state
* Theme / language
* User settings

**Ishlatilmaydi:**

* Temporary UI state
* Loading flag
* Modal open/close
