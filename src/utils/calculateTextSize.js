const cache = {}

export const calculateTextSize = (text, options = {}) => {
    const cacheKey = JSON.stringify({ text, options })
    if (cache[cacheKey]) {
        return cache[cacheKey]
    }

    const cnvs = window.cnvs || document.createElement('canvas')
    const ctx = cnvs.getContext('2d')
    Object.keys(options)
        .forEach(
            key => {
                ctx[key] = options[key]
            }
        )
    const size = ctx.measureText(text)

    cache[cacheKey] = size
    return size
}
