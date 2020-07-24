export default class ClearPicture{
    constructor({...prop}) {
        this.canvas = prop.canvas;
        this.background = prop.background;
        this.canvasWidth = prop.canvasWidth;
        this.canvasHeight = prop.canvasHeight;
        this.lineWidth = prop.lineWidth;
        this.finishCallback = prop.finishCallback;
        this.completeRatio = prop.completeRatio;
        this.finishFlag = false;
        this.checkAmount = 10;
        this.init();
    }
    init(){
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = 'round';
        const picture = new Image();
        picture.onload = ()=>{
            this.ctx.drawImage(picture,0,0);
            this.addEvents();
        }
        picture.src = this.background;
    }
    addEvents(){
        this.canvas.addEventListener('touchstart',(e)=>{
            this.beginDraw(e);
        })
        this.canvas.addEventListener('touchmove',(e)=>{
            this.drawing(e);
        })
        this.canvas.addEventListener('touchend',()=>{
            this.finishDraw();
            this.finishChecking();
        })
    }
    beginDraw(e){
        if(this.finishFlag) return;
        const touchPosition = this.getPosition(e);

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(touchPosition.x,touchPosition.y,this.lineWidth/2,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(touchPosition.x,touchPosition.y);
    }
    drawing(e){
        if(this.finishFlag) return;
        const touchPosition = this.getPosition(e);
        this.ctx.lineTo(touchPosition.x,touchPosition.y);
        this.ctx.stroke();
    }
    finishDraw(){
        this.ctx.closePath();
    }
    getPosition(e){
        const touchPosition = {x:-1,y:-1};
        const scale = this.canvas.width / this.canvas.getBoundingClientRect().width;
        touchPosition.x = (e.touches[0].clientX - this.canvas.getBoundingClientRect().x) * scale;
        touchPosition.y = (e.touches[0].clientY - this.canvas.getBoundingClientRect().y) * scale;
        return touchPosition;
    }
    finishChecking(){
        if(this.finishFlag) return;
        let clearAmount = 0;
        for(let x = 0; x < this.checkAmount; x++){
            for(let y = 0; y < this.checkAmount; y++){
                const imageData = this.ctx.getImageData(this.canvas.width/this.checkAmount*x,this.canvas.height/this.checkAmount*y,1,1);
                if(imageData.data[3]===0) clearAmount++;
            }
        }
        if(clearAmount >= Math.floor((this.checkAmount**2)*this.completeRatio)){
            this.finishFlag = true;
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.finishCallback();
        }
    }
}