# Історія 6 клас · Екстернат · ІІ семестр

Готовий бойовий frontend для GitHub Pages + backend на Google Apps Script для надсилання результатів у Telegram.

## Файли
- `index.html`
- `style.css`
- `app.js`
- `README.md`

## Що реалізовано
- 48 завдань
- випадковий порядок завдань
- 2 блоки по 24
- загальний таймер 40 хвилин
- обов’язкова перерва 5 хвилин після 1 блоку
- світла / темна тема
- загальний результат
- ГР1
- ГР2
- ГР3 як процедурний індикатор сумлінного виконання
- надсилання результату в Google Apps Script / Telegram

## GitHub Pages
1. Завантажте в репозиторій:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
2. Увімкніть:
   - `Settings → Pages`
   - `Deploy from a branch`
   - `main / root`

## Google Apps Script
1. Створіть Apps Script проєкт
2. Вставте код у `Code.gs`
3. У `Project Settings → Script Properties` додайте:
   - `BOT_TOKEN`
   - `CHAT_ID`
4. Розгорніть:
   - `Deploy → New deployment`
   - `Type: Web app`
   - `Execute as: Me`
   - `Who has access: Anyone`
5. Скопіюйте URL `/exec`

## Підключення frontend до GAS
У `app.js` уставте ваш URL:

```js
GAS_URL: "https://script.google.com/macros/s/ВАШ_ID/exec"
