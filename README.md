# telehumpter

Недо-пародия на твиттер на Firebase+Vue.

## Технологии

- [Vue.js](https://vuejs.org/)
- [Vee-validate](https://vee-validate.logaretm.com/v4/)
- [Vue3-toastify](https://vue3-toastify.js-bridge.com/)
- [Firebase](https://firebase.google.com/)
- [Vuefire](https://vuefire.vuejs.org/)
- [DaisyUI](https://daisyui.com/)
- [Tailwind](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)

## Схема Firebase

```json
{
  "posts": [
    {
      "id": "_hidden",
      "desc": "чтобы firestore не удалил ничего",
      "hidden": true
    },
    {
      "id": "рандомная строка", // сгенерировано firestore, а не мной
      "content": "контент поста",
      "authorNick": "ник автора поста",
      "authorId": "id автора поста"
    }
  ]
}
```
