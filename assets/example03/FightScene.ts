import MyHeroComp from "./MyHeroComp";
import MyHeroFactory from "./MyHeroFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FightScene extends cc.Component {

    /**
     * start
     */
    start () {
        cc.director.getCollisionManager().enabled = true;

        MyHeroFactory.createAsync("Hero_Hammer", (hero1) => {
            cc.Canvas.instance.node.addChild(hero1);
            hero1.x = -200;
            hero1.active = true;
        });

        MyHeroFactory.createAsync("Hero_Shaman", (hero2) => {
            cc.Canvas.instance.node.addChild(hero2);
            hero2.x = 200;
            hero2.active = true;
        })

        MyHeroFactory.createAsync("Hero_Skeleton", (hero3) => {
            cc.Canvas.instance.node.addChild(hero3);
            hero3.x = 0;
            hero3.active = true;
        })

        // this.schedule(() => {
        //     MyHeroFactory.createAsync("Hero_Hammer", (oHeroNode) => {
        //         cc.Canvas.instance.node.addChild(oHeroNode);
        //         oHeroNode.x = Math.random() * 300;
        //         oHeroNode.y = Math.random() * 200;
        //         oHeroNode.active = true;
        //     })
        // }, 2, 10);

        // this.schedule(() => {
        //     MyHeroFactory.createAsync("Hero_Shaman", (oHeroNode) => {
        //         cc.Canvas.instance.node.addChild(oHeroNode);
        //         oHeroNode.x = Math.random() * 300;
        //         oHeroNode.y = Math.random() * 200;
        //         oHeroNode.active = true;
        //     })
        // }, 2, 10);

        // this.schedule(() => {
        //     MyHeroFactory.createAsync("Hero_Skeleton", (oHeroNode) => {
        //         cc.Canvas.instance.node.addChild(oHeroNode);
        //         oHeroNode.x = Math.random() * 300;
        //         oHeroNode.y = Math.random() * 200;
        //         oHeroNode.active = true;
        //     })
        // }, 2, 10);

        cc.Canvas.instance.node.on(
            cc.Node.EventType.MOUSE_UP, (event: cc.Event) => {
                switch (event["getButton"]()) {
                    case 0: {
                        // 左键攻击
                        cc.find("Canvas/Hero_Hammer").getComponent(MyHeroComp).attack();
                        break;
                    }

                    case 1: {
                        // 中键摆pos
                        cc.find("Canvas/Hero_Hammer").getComponent(MyHeroComp).pos();
                        break;
                    }

                    case 2: {
                        // 获取鼠标点击的坐标
                        let oMouseX = event["getLocationX"]();
                        let oMouseY = event["getLocationY"]();

                        // 将一个点转换到节点 (局部) 空间坐标系
                        let oMoveTo = this.node.convertToNodeSpaceAR(cc.v2(oMouseX, oMouseY));

                        // 右键移动
                        cc.find("Canvas/Hero_Hammer").getComponent(MyHeroComp).move(oMoveTo.x, oMoveTo.y);

                        break;
                    }
                }
        })
    }
}
