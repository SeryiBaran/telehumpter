export function randomPastelHSLByStr(str: string) {
  function getHashOfString(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++)
      hash = str.charCodeAt(i) + ((hash << 5) - hash)

    hash = Math.abs(hash)
    return hash
  }

  function normalizeHash(hash: number, min: number, max: number) {
    return Math.floor((hash % (max - min)) + min)
  }

  const randomColor = normalizeHash(getHashOfString(str), 0, 360)

  return `hsl(${randomColor}, 70%,  80%)`
}

export function getUpperFirstLetter(str: string) {
  return str[0].toUpperCase()
}
