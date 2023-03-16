import Async from "./Async";

// @const
const BUNDLE_NAME = "prefab";

/**
 * 我的英雄工厂类
 */
export default class MyHeroFactory {
    /**
     * 私有化类默认构造器
     */
    private constructor() {

    }

    // static createAsync(heroName: string, funCallback: (oHeroNode: cc.Node) => void): void {
    //     if (null == heroName) {
    //         return;
    //     }

    //     let oLoadedBundle = cc.assetManager.getBundle(BUNDLE_NAME);
    //     let oLoadedPrefab = null;

    //     Async.serize(
    //         (funYesContinue) => {
    //             if (null != oLoadedBundle) {
    //                 funYesContinue();
    //                 return;
    //             }

    //             cc.assetManager.loadBundle(BUNDLE_NAME, (oError: Error, oBoundle: cc.AssetManager.Bundle) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 oLoadedBundle = oBoundle;
    //                 funYesContinue();
    //             })
    //         },

    //         (funYesContinue) => {
    //             oLoadedPrefab = oLoadedBundle.get(heroName, cc.Prefab);

    //             if (null != oLoadedPrefab) {
    //                 funYesContinue();
    //                 return;
    //             }


    //             oLoadedBundle.load(heroName, cc.Prefab, (oError: Error, oPrefab: cc.Prefab) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 oLoadedPrefab = oPrefab;
    //                 funYesContinue();
    //             });
    //         },

    //         (funYesContinue) => {
    //             let oMainBundle = cc.assetManager.getBundle("main");
    //             oMainBundle.preloadDir(`spine/${heroName}`, (oError: Error) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 funYesContinue();
    //             })
    //         },

    //         () => {
    //             if (null == oLoadedPrefab) {
    //                 cc.error(`预制体为空, prefabName = ${heroName}`);
    //                 return;
    //             }
    //             let oHeroNode = cc.instantiate(oLoadedPrefab);
    //             funCallback(oHeroNode);
    //         }
    //     );
    // }

    // static createAsync (strHeroName: string, funCallback: (oHeroNode: cc.Node) => void) {
    //     if (null == strHeroName) {
    //         return;
    //     }

    //     let oLoadedBundle = null;
    //     let oLoadedPrefab = null;

    //     Async.serize(

    //         // 第一步，加载bundle
    //         (funYesContinue) => {
    //             oLoadedBundle = cc.assetManager.getBundle(BUNDLE_NAME);

    //             if (null != oLoadedBundle) {
    //                 funYesContinue();
    //                 return;
    //             }

    //             cc.assetManager.loadBundle(BUNDLE_NAME, (oError: Error, oBoundle: cc.AssetManager.Bundle) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 oLoadedBundle = oBoundle;
    //                 funYesContinue();
    //             })
    //         },

    //         // 第二步，加载预制体
    //         (funYesContinue) => {
    //             oLoadedPrefab = oLoadedBundle.get(strHeroName, cc.Prefab);

    //             if (null != oLoadedPrefab) {
    //                 funYesContinue();
    //                 return;
    //             }

    //             oLoadedBundle.load(strHeroName, cc.Prefab, (oError: Error, oPrefab: cc.Prefab) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 oLoadedPrefab = oPrefab;
    //                 funYesContinue();
    //             })
    //         },

    //         // 第三步, 加载spine动画资源
    //         (funYesContinue) => {
    //             let oMainBundle = cc.assetManager.getBundle("main");
    //             oMainBundle.preloadDir(`spine/${strHeroName}`, (oError: Error) => {
    //                 if (null != oError) {
    //                     cc.error(oError);
    //                     return;
    //                 }

    //                 funYesContinue();
    //             })
    //         },

    //         // 第四步, 创建新节点
    //         () => {
    //             if (null == oLoadedPrefab) {
    //                 cc.error(`预制体为空, oHeroName = ${strHeroName}}`);
    //                 return;
    //             }

    //             let oHeroNode = cc.instantiate(oLoadedPrefab);
    //             funCallback(oHeroNode);
    //         }
    //     );
    // }

    static createAsync(oHeroName: string, funCallback: (oHerNode: cc.Node) => void) {
        if (null == oHeroName) {
            return;
        }

        let oLoadedBundle = null;
        let oLoadedPrefab = null;

        Async.serize(
            // 第一步, 加载bundle
            (funYesCon) => {
                oLoadedBundle = cc.assetManager.getBundle(BUNDLE_NAME);

                if (null != oLoadedBundle) {
                    funYesCon();
                    return;
                }

                cc.assetManager.loadBundle(BUNDLE_NAME, (oError: Error, oBundle: cc.AssetManager.Bundle) => {
                    if (null != oError) {
                        cc.error(oError);
                        return;
                    }

                    oLoadedBundle = oBundle;
                    funYesCon();
                })
            },

            // 第二步, 加载prefab预制体
            (funYesCon) => {
                oLoadedPrefab = oLoadedBundle.get(oHeroName, cc.Prefab);

                if (null != oLoadedPrefab) {
                    funYesCon();
                    return;
                }

                oLoadedBundle.load(oHeroName, cc.Prefab, (oError: Error, oPrefab: cc.Prefab) => {
                    if (null != oError) {
                        funYesCon();
                        return;
                    }

                    oLoadedPrefab = oPrefab;
                    funYesCon();
                })
            },

            // 第三步, 加载spine动画资源
            (funYess) => {
                let oMainBundle = cc.assetManager.getBundle("main");
                oMainBundle.preloadDir(`spine/${oHeroName}`, (oError: Error) => {
                    if (null != oError) {
                        cc.error(oError);
                    }

                    funYess();
                })
            },

            // 第四步, 创建新节点
            () => {
                if (null == oLoadedPrefab) {
                    cc.error(`该预制体为空, oHeroName = ${oHeroName}`);
                }

                let oHeroNode = cc.instantiate(oLoadedPrefab);
                funCallback(oHeroNode);
            }
        );
    }
}