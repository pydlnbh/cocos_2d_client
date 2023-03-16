const {ccclass, property} = cc._decorator;
const MOVE_SPEED = 128;
const ATTACK_HP = 10;

@ccclass
export default class MyHeroComp extends cc.Component {

    /**
     * 是否移动
     */
    isMoving: boolean = false;

    /**
     * 移动方向
     */
    moveDirection: {nX: number, nY: number} = null;

    /**
     * 目标位置
     */
    moveTo: {nX: number, nY: number} = null;

    /**
     * 攻击对象集合
     */
    _oAttackAbleObjSet: Set<cc.Node> = null;

    /**
     * 当前血量
     */
    _oCurrHp = 0;

    /**
     * start
     */
    start (): void {
        this._oCurrHp = 100;
    }

    /**
     * update
     * 
     * @param dt 变化时间
     */
    update (dt: number): void {
        // 判读是否运动
        if (!this.isMoving) {
            return;
        }

        // 声明当前节点
        let oCurrHero = this.node;

        // 判断x坐标是否到达目标位置
        if ((oCurrHero.x >= this.moveTo.nX && this.moveDirection.nX > 0) ||
            (oCurrHero.x <= this.moveTo.nX && this.moveDirection.nX < 0)) {
                this.moveDirection.nX = 0;
            }

        // 判断y坐标是否到达目标位置
        if ((oCurrHero.y >= this.moveTo.nY && this.moveDirection.nY > 0) || 
            (oCurrHero.y <= this.moveTo.nY && this.moveDirection.nY < 0)) {
                this.moveDirection.nY = 0;
            }

        // 判断x，y坐标到达后，清除动作
        if (0 == this.moveDirection.nX && 0 == this.moveDirection.nY) {
            this.isMoving = false;
            oCurrHero.getComponent(sp.Skeleton).clearTrack(1);
            return;
        }

        // 移动x，y坐标
        oCurrHero.x += this.moveDirection.nX * MOVE_SPEED * dt;
        oCurrHero.y += this.moveDirection.nY * MOVE_SPEED * dt;

        oCurrHero.zIndex = -oCurrHero.y;
    }

    /**
     * 碰撞进入
     * 
     * @param oAnotherBox 另一个盒子
     */
    onCollisionEnter(oAnotherBox: cc.BoxCollider): void {
        if (null != oAnotherBox) {
            this._oAttackAbleObjSet = this._oAttackAbleObjSet || new Set();
            this._oAttackAbleObjSet.add(oAnotherBox.node);
        }
    }

    /**
     * 碰撞退出
     * 
     * @param oAnotherBox 另一个盒子
     */
    onCollisionExit(oAnotherBox: cc.BoxCollider): void {
        if (null != oAnotherBox &&
            null != this._oAttackAbleObjSet) {
            return;
        }

        this._oAttackAbleObjSet.delete(oAnotherBox.node);
    }

    /**
     * 攻击
     */
    attack (): void {
        let oCurrHero = this.node;
        let skeleton = oCurrHero.getComponent(sp.Skeleton);
        let trackEntry = skeleton.setAnimation(2, "attck", false);

        skeleton.setTrackCompleteListener(trackEntry, () => {
            skeleton.clearTrack(2);
        })

        if (null == this._oAttackAbleObjSet ||
            this._oAttackAbleObjSet.size <= 0) {
            return;
        }

        this._oAttackAbleObjSet.forEach((obj) => {
            if (Math.abs(obj.zIndex - oCurrHero.zIndex) >= 64) {
                return;
            }

            if (((obj.x - oCurrHero.x) >= 64 && oCurrHero.scaleX < 0) ||
                ((obj.x - oCurrHero.x) <= -64 && oCurrHero.scaleX > 0)) {
                return;
            }

            obj.getComponent(MyHeroComp).subtractHp(ATTACK_HP);
        });
    }

    /**
     * 减血
     * 
     * @param nVal 
     * @returns 
     */
    subtractHp(nVal: number): void {
        if (nVal <= 0) {
            return;
        }

        // 防止hp小于0
        this._oCurrHp = Math.max(this._oCurrHp - nVal, 0);

        let oSubtractHp = cc.find("SubtractHp", this.node);
        oSubtractHp = cc.instantiate(oSubtractHp);
        oSubtractHp.getComponent(cc.Label).string = "-" + nVal;
        oSubtractHp.active = true;
        this.node.addChild(oSubtractHp);

        // 缓动过程
        cc.tween(oSubtractHp)
          .to(0.0, { scale: 3.2 })
          .to(0.2, { scale: 1.0 })
          .by(0.4, { y: 64, opacity: -128 })
          .start();

        this.schedule(() => {
            oSubtractHp.destroy();
        }, 0.4);
        
        if (this._oCurrHp <= 0) {
            this.die();
        }
    }

    /**
     * 倒地
     */
    die(): void {
        this.node.getComponent(sp.Skeleton).setAnimation(1, "Die", false);
    }

    /**
     * onDestroy
     */
    onDestroy(): void {
        if (null != this._oAttackAbleObjSet) {
            this._oAttackAbleObjSet.clear();
        }
    }

    /**
     * 移动到指定位置
     * 
     * @param nPosX 位置x
     * @param nPosY 位置y
     */
    move (nPosX: number, nPosY: number): void {
        let oCurrHero = this.node;

        this.moveDirection = {nX: 0, nY: 0};
        this.moveDirection.nX = (oCurrHero.x <= nPosX) ? 1 : -1;
        this.moveDirection.nY = (oCurrHero.y <= nPosY) ? 1 : -1;

        // 角色转向
        oCurrHero.scaleX = this.moveDirection.nX;

        this.moveTo = {
            nX: nPosX,
            nY: nPosY,
        }

        if (!this.isMoving) {
            this.isMoving = true;
            let skeleton = oCurrHero.getComponent(sp.Skeleton);
            skeleton.setAnimation(1, "walk", true);
        }
    }

    /**
     * 换姿势
     */
    pos(): void {
        let oCurrHero = this.node;
        let skeleton = oCurrHero.getComponent(sp.Skeleton);
        let trackEntry = skeleton.setAnimation(2, "pos", false);

        skeleton.setTrackCompleteListener(trackEntry, () => {
            skeleton.clearTrack(2);
        })
    }
}
