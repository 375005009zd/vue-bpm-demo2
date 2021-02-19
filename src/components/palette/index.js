import customPalette from './CustomPalette'
import CustomPaletteProvider from './CustomPaletteProvider'
// 除了引进的模块的名字可以修改，其他的不建议修改，会报错
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
