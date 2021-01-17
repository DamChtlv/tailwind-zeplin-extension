import _ from 'lodash'
import s from 'string'
import {
    colorToClass,
    dropTheRem,
    closestKey,
} from './helpers'

const REM = 16

export function borderRadiusToClass(tailwind, radius) {
    let ratio = radius / REM
    let sizes = dropTheRem(tailwind.borderRadius)
    let size = closestKey(sizes, ratio)

    if (size === 'none') return null

    return size === 'default' ? 'rounded' : 'rounded-' + size
}

export function opacityToClass(tailwind, opacity) {
    let key = closestKey(tailwind.opacity, opacity)

    if (key === '100') return null

    return 'opacity-' + key
}

/**
 {
    "type": "outer",
    "offsetX": 0,
    "offsetY": 2,
    "blurRadius": 4,
    "spread": 6,
    "color": {
        "r": 0,
        "g": 0,
        "b": 0,
        "a": 0.5
    }
  }
 */
export function shadowsToClass(tailwind, layerShadows) {
    // return if no shadows
    if (!layerShadows[0]) return null
    let layerShadow = layerShadows[0]

    // only get the relevant shadows
    let innerShouldBe = layerShadow.type === 'inner'
    let shadows = _.pick(tailwind.shadows, css => {
        let inner = css.includes('inset')
        return inner === innerShouldBe
    })

    // Grab the blurs
    let blurs = _.mapValues(tailwind.shadows, shadow => {
        let parts = shadow.split(' ')
        let idx = parts[0] === 'inset' ? 3 : 2

        return parts[idx] ? parseInt(parts[idx]) : null
    })

    // business as usual
    let key = closestKey(blurs, layerShadow.blurRadius)

    if (key === 'none') return null

    return key === 'default' ? 'shadow' : 'shadow-' + key
}

export function backgroundClass(context, tailwind, fills) {
    if (!fills[0] || fills[0].type !== 'color') return null
    let fill = fills[0]

    return colorToClass(context, fill.color, 'bg-')
}

export function borderClass(tailwind, borders) {
    if (!borders[0]) return null
    let border = borders[0]

    let sizes = dropTheRem(tailwind.borderWidths)
    let key = closestKey(sizes, border.thickness)

    if (key === '0') return null

    return key === 'default' ? 'border' : 'border-' + key
}

export function borderColor(context, tailwind, borders) {
    if (!borders[0] || !borders[0].fill.color) return null
    let border = borders[0]

    return colorToClass(context, border.fill.color, 'border-')
}

export function maxWidthClass(tailwind, { width }) {
    let ratio = width / REM
    let widths = dropTheRem(tailwind.maxWidth)
    let key = closestKey(widths, ratio)

    return 'max-w-' + key
}

export function minHeightClass(tailwind, { height }) {
    let ratio = height / REM
    let heights = dropTheRem(tailwind.minHeight)
    let key = closestKey(heights, ratio)

    if (key === '0') return null

    return 'min-h-' + key
}

export function contentToTransformClass(content) {
    if (content !== content.toUpperCase()) return null

    return 'uppercase'
}

export function contentToTruncateClass(content) {
    if (!content.includes('...') && !content.includes('…')) return null

    return 'truncate'
}


export function fontFamilyToClass(context, family) {
    if (family.toLowerCase() === context.getOption('font').toLowerCase()) return null

    return 'font-' + s(family).slugify().s
}

export function fontSizeToClass(tailwind, fontSize) {
    let ratio = fontSize / REM
    let sizes = dropTheRem(tailwind.textSizes)
    let size = closestKey(sizes, ratio)

    if (size === 'base') return null

    return 'text-' + size
}

export function fontWeightToClass(weight) {
    if (weight === 'normal') return null

    return 'font-' + weight
}

export function fontStyleToClass(style) {
    if (style === 'normal') return null

    return 'font-' + style
}

export function lineHeightToClass(tailwind, size, height) {
    let ratio = height / size
    let leading = closestKey(tailwind.leading, ratio)

    if (leading === 'none') return null

    return 'leading-' + leading
}

export function textAlignToClass(align) {
    if (!align || align === 'left') return null

    return 'text-' + align
}

export function letterSpacingToClass(tailwind, size, spacing) {
    let ratio = spacing / size
    let trackings = dropTheRem(tailwind.tracking)
    let tracking = closestKey(trackings, ratio)

    if (tracking === 'normal') return null

    return 'tracking-' + tracking
}

export function fontWeightTextToClass(weight) {
    if (weight === 'regular') return null

    return 'font-' + weight
}

// export default {
//     borderRadiusToClass,
//     opacityToClass,
//     shadowsToClass,
//     backgroundClass,
//     borderClass,
//     borderColor,
//     maxWidthClass,
//     minHeightClass,
//     contentToTransformClass,
//     contentToTruncateClass,
//     fontFamilyToClass,
//     fontSizeToClass,
//     fontWeightToClass,
//     fontStyleToClass,
//     lineHeightToClass,
//     textAlignToClass,
//     letterSpacingToClass,
//     fontWeightTextToClass,
//     borderClass,
// }
