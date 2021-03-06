//Variables
let grav = 1;
let lift = -0.92*2;
let pull = 1.1;
let windForce = 1.2;
let W = window.innerWidth;
let H = window.innerHeight;
    console.log(H);
let balls = [];
//Functions
const num = {
        random: (max, min = 1) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }
function Ball(index,x, y){
    this.x = x || num.random(W);
        this.dx = 0;
    this.y = y || num.random(H / 10);
        this.dy = 0;
    this.r = num.random(220, 50);
        this.x = num.random(W - this.r);
    this.mass = this.r / 100;
    this.frX = 0.85;
    this.frY = 0.8;
    this.f = 7;
    this.cF = 0.998;
    this.id = index;
    this.show = (id) => {
        let el = document.createElement("span");
        document.body.appendChild(el);
        switch(index){
            case 0: this.id = "zero";break;
            case 1: this.id = "one";break;
            case 2: this.id = "two";break;
            case 3: this.id = "three";break;
            case 4: this.id = "four";break;
            case 5: this.id = "five";break;
            case 6: this.id = "six";break;
        }
        el.setAttribute('class', 'ball');
        el.setAttribute('id', this.id);
        el.style.setProperty('--size', this.r);
        this.updateColors();
    }
    this.events = (id) => {
        console.log('Setting events');
        let keys = document.querySelector('div.keys').children;
        keys[1].addEventListener('click', this.boost, true);
        keys[3].addEventListener('click', ()=>{this.move(-1)}, true);
        keys[5].addEventListener('click',  ()=>{this.move(1)}, true);
        document.addEventListener('keydown', this.keyHandles, true);
        window.addEventListener('resize', () =>{
            W = window.innerWidth;
            H = window.innerHeight;
        });
    }
    this.keyHandles = (e) => {
        switch(e.keyCode){
            case 65, 37: e.preventDefault(), this.move(-1);break;
            case 68, 39: e.preventDefault(), this.move(1);break;
            case 32, 38: e.preventDefault(), this.boost();break;
            case 81: e.preventDefault(), this.boom();break;
        }
    }
    this.updateColors = () =>{
        let elem = document.querySelector(`span#${this.id}`).style;
        //Color
        let r = num.random(255, 70);
        let g = num.random(250, 70);
        let b = num.random(255, 70);
            elem.setProperty('--bg', `rgb(${r},${g},${b})`);
    }
    this.change = () => {
        this.r = num.random(200,20);
        this.updateColors();
    }
    this.move = (v) => {
        this.dx += this.f * v;
    }
    this.boost = (e) => {
        if(this.y >= (H - this.r) / 1.5){//Checking if can jump
            if(this.dy > 0){
                this.dy *= -1 + 2;
            }else{
                this.dy -= 45;
            }
        }
    }
    this.boom = (e) => {
        let str = 100;
        for(i = 0; i < balls.length; i++){
            balls[i].dx = num.random(str, -str);
            balls[i].dy = num.random(str, -str);
        }
    }
    this.ver = (e) => {
        this.dy += Math.round(grav * this.mass);
        this.y += this.dy;
        if(this.y >= H - this.r){
            this.y = H - this.r;
            this.dy = -this.dy;
            this.dy *= this.frY;
            Math.round(this.dy);
            this.y += this.dy;
            if(this.y <= H - 1){
                this.y = H - this.r;
            }
        }
        if(this.y <= 0){
            this.y = 0;
            this.dy = -this.dy;
            this.change();
        }
    }
    this.hor = (e) => {
        this.x += this.dx;
        this.dx *= 0.99;
        if(this.x < 0){
            this.x = 0;
            this.dx = -this.dx; 
            this.dx *= this.frX;
            this.updateColors();
        }
        if(this.x >= W - this.r){
            this.x = W - this.r;
            this.dx = -this.dx; 
            this.dx *= this.frX;
            this.updateColors();
        }
        if(this.y >= H - this.r){
            this.dx *= this.cF;
        }
    }
    this.update = (id) => {
        this.ver();
        this.hor();
        //Dev shit
        /*if(this.y >= (H - this.r) / 1.5){
            console.log('Can jump :D');
        }*/
        document.querySelector(`#${this.id}`).style.setProperty('--x', this.x);
        document.querySelector(`#${this.id}`).style.setProperty('--y', this.y);
        document.querySelector(`#${this.id}`).style.setProperty('--size', this.r);
        requestAnimationFrame(this.update);
    }
    return this;
}
(function setUp(){
    for(i = 0; i < 7; i++){//Can create up to 7
        balls.push(new Ball(i));
        balls[i].show(balls[i].id);
        balls[i].events(balls[i].id);
        balls[i].update(balls[i].id);
        console.log(balls[i].y);
    };
})();
//events 