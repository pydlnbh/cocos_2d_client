// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hello extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    x: number = 1;
    y: number = 1;
    button: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("onLoad");
    }

    start () {
        console.log("start");

        this.label.string = "Hello " + this.text;
        
        cc.Canvas.instance.node.on(
            cc.Node.EventType.TOUCH_END, () => {
                console.log("touch end")
                this.button = !this.button;
            }
        )
    }

    update (dt: number): void {
        if (null == this.label || !this.button) {
            return;
        }

        if ((this.label.node.x >= 480 && this.x > 0) ||
            (this.label.node.x <= -480 && this.x < 0)) {
            this.x = -this.x;
        }

        if ((this.label.node.y >= 320 && this.y > 0) ||
            (this.label.node.y <= -320 && this.y < 0)) {
            this.y = -this.y;
        }

        this.label.node.x += this.x;
        this.label.node.y += this.y;
    }
}
