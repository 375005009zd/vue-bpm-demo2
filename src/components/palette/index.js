import customPalette from './CustomPalette'
import PaletteProvider from './CustomPaletteProvider'
import CustomPaletteProvider from './CustomPaletteProvider'

export default {
    __depends__: [
        {
            __init__: ['customPalette'],
            customPalette:['type', customPalette]
        }
    ], //依赖于customPalette
    __init__: ['customPaletteProvider'], //调用customPaletteProvider来初始化
    customPaletteProvider: ['type', CustomPaletteProvider]
}