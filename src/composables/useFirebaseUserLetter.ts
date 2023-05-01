import { type Ref, computed } from 'vue'

export function useFirebaseUserLetter(user: Ref) {
  const userAvatarLetter = computed(() => {
    const displayName = user.value?.displayName
    if (displayName)
      return displayName[0]

    return 'U'
  })

  return userAvatarLetter
}
