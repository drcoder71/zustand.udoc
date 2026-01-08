# Introduction

Zustand kichik, moslashuvchan va sodda syntaksis asosida ishlaydigan state management. Zustand o'zining ortiqcha providerlarsiz state larni boshqarishda keng qo'llaniladi. Shuningdek zustand state larni yo'qolib qolish muammolariga ham yechim bo'la olgan state management hisobladi.

## Installation

Zustand state management package ni o'rnatish uchun npm/yarn/pnpm kabi package manager ning biridan foydalaniladi.

```
# NPM
npm install zustand
# OR
npm i zustand
```

```
# YARN
yarn add zustand
```

```
# PNPM
pnpm install zustand
# OR
pnpm i zustand
```

O'zingizga mos bo'lgan package manager bilan bemalol ishlashingiz mumkin.

## Create a store

Zustandda yaratgan har bir store lar asosan hook deb hisoblaniladi. Zustandda store da har qanday data type bilan ishlashingiz mumkin.

```
# THE CREATE COUNTER STORE
import { create } from 'zustand'

const useCounter = create(() => ({
  count: 0,
}))
```

**create()** yordamida zustandda store yaratiladi. **create()** o'zida set nomli callback function qabul qiladi.

## Set data to store

```
# CREATE STORE & SET DATA
import { create } from 'zustand'

const useCounter = create((set) => {
    count: 0,
    incrementCount: () => set(state => ({count: count + 1})),
    decrementCount: () => set(state => ({count: count - 1}))
})

```

## Bind with components

Zustand storeni client side ning har qayerida hook sifatida ishlatishingiz mumkin. Hech qanday ortiqcha provider lar yozmagan holatda o'z componentingiz da ishlatishingiz mumkin.

```
# BIND WITH COMPONENT
function CounterPanel() {
  const count = useCounter((state) => state.count)
  const incrementHandler = useCounter((state) => state.incrementCount)

  return <button onClick={incrementHandler}>{count} up</button>
}
```

Zustand store **<useCounter()>** componentda chaqirilgandan keyin parametirdan state callback function qabul qiladi. Va shu callback function yordamida store da yozilgan dataga, mutation function larga qo'l uzata olamiz.

Hozirda zustand storedan ma'lumotlarni  state callback function ko'rinishida emas. Balkim object destructer yordamida olish imkoniyati ham bor.

```
# GET DATA & MUTATION BY DESTRUCTER
function CounterPanel() {
  const {count, incrementCount} = useCounter()
  return <button onClick={incrementHandler}>{count} up</button>
}
```
