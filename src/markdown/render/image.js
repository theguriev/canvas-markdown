const imgLoaded = ({ complete, naturalHeight }) => complete && naturalHeight !== 0

export const image = ({
    ctx, src, x, y, width, height
}) => {
    const fromCache = image.cache[src]
    const img = fromCache || new Image()
    if (!fromCache) {
        img.src = src
        img.onerror = () => {
            img.hasError = true
        }
    }
    if (imgLoaded(img) && img.hasError !== true) {
        ctx.drawImage(img, x, y, width, height)
    }
    image.cache[src] = img
}

image.cache = {}
