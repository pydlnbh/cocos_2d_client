const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    /**
     * start
     */
    start (): void {
        cc.Canvas.instance.node.on(
            cc.Node.EventType.TOUCH_END, () => {
                let skeleton = cc.find("Canvas/Hero_1").getComponent(sp.Skeleton);
                let trackEntry = skeleton.setAnimation(1, "attck", false);

                skeleton.setTrackCompleteListener(trackEntry, () => {
                    skeleton.clearTrack(1);
                })
            }
        )
    }
}
