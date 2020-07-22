## 简介

`clear-picture` 可以用于手指涂抹清除图片的场景，类似于刮刮卡。

## 安装

使用 [npm](https://www.npmjs.com/package/clear-picture) 安装：

```npm
$ npm i clear-picture --save
```

## 使用

```javascript
import ClearPicture from 'create-picture';

const cp = new ClearPicture({
   canvas: document.getElementById('canvas'), // 页面中的 canvas 元素
   background: require('../assets/draw_image.jpg'), // 用于涂抹的背景，涂抹完成后消失 
   canvasWidth: 500, // canvas 宽度
   canvasHeight: 500, // canvas 高度
   circleRadius: 30, // 画笔圆圈粗细
   completeRatio: 0.5, // 完成度，最大值为 1
   finishCallback: ()=>{
        // 完成回调
    }, 
});
```