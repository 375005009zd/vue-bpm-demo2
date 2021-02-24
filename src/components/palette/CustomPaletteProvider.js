import {
  assign
} from 'min-dash';


/**
 * A palette provider for BPMN 2.0 elements.
 */
//数据提供器

//重写
//注意：可以通过config这个对象拿到实例化Modeler的时候的参数
//所以这里通过注入config.paletteEntries拿到paletteEntries的值
PaletteProvider.$inject = ['config.paletteEntries','customPalette']

export default function PaletteProvider(paletteEntries,customPalette) {
   this._entries = paletteEntries

   customPalette.registerProvider(this)
}

PaletteProvider.prototype.getPaletteEntries = function(element) {
  return this._entries //返回工具栏数据
}
