// uno.config.js
import {
  // eslint-disable-next-line
  Preset,
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify
} from 'unocss-applet'

import { presetUni } from '@uni-helper/unocss-preset-uni'

// @see https://unocss.dev/presets/legacy-compat
import presetLegacyCompat from '@unocss/preset-legacy-compat'

const isH5 = process.env?.UNI_PLATFORM === 'h5'
const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false

const presets = []
if (!isMp) {
  /**
   * you can add `presetAttributify()` here to enable unocss attributify mode prompt
   * although preset is not working for applet, but will generate useless css
   * 为了不生产无用的css,要过滤掉 applet
   */
  // 支持css class属性化，eg: `<button bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" text="sm white">attributify Button</button>`
  presets.push(presetAttributify())
}
if (!isH5) {
  presets.push(presetRemRpx())
}
export default defineConfig({
  presets: [
    presetApplet({ enable: !isH5 }),
    ...presets,
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
    // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
    // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
    presetLegacyCompat({
      commaStyleColorFunction: true
    }),
    presetUni() // 解决 Windows 用户？告别烦人的崩溃
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [['center', 'flex justify-center items-center']],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg'
    }),
    transformerApplet()
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      }
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    // 匹配类似 bg-#hex/alpha 的类名，并转换为 rgba
    [/^(bg|text)-#([0-9a-fA-F]{3,6})(\/(\d+(?:\.\d+)?))?$/, ([, type, color, alpha]) => {
      let opacity = 1
      if (alpha) {
        alpha = alpha.replace('/', '')
        opacity = parseFloat(alpha)
      }
      // 确保颜色值是完整的6位，如果是3位需要复制每一位
      const fullColor = color.length === 3 ? color.split('').map(c => c + c).join('') : color
      return {
        [`--un-${type}-opacity`]: opacity,
        [type === 'text' ? 'color' : 'background-color']: `rgba(${parseInt(fullColor.slice(0, 2), 16)} ${parseInt(fullColor.slice(2, 4), 16)} ${parseInt(fullColor.slice(4, 6), 16)} ${opacity})`
      }
    }]
  ]
})
