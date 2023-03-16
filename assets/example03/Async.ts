// type YesContinue = () => void;
// type CustomFuntion = (funYesContinue: YesContinue) => void

type YesContinue = () => void;
type customFun = (funYesContinue: YesContinue) => void;

export default class Async {
    /**
     * 私有化类默认构造器
     */
    private constructor() {

    }

    /**
     * 异步工具类
     */
    // static serize(...oFunArray: Array<CustomFuntion>): void {
    //     if (null == oFunArray || oFunArray.length <= 0) {
    //         return;
    //     }

    //     let funYesContinue = (): void => {
    //         if (oFunArray.length <= 0) {
    //             return;
    //         }

    //         let currFun = oFunArray.shift();

    //         if ("function" == typeof (currFun)) {
    //             currFun(funYesContinue);
    //         } else {
    //             funYesContinue();
    //         }
    //     }

    //     funYesContinue();
    // }

    // static serize (...oFunQueue: Array<customFun>): void {
    //     if (null == oFunQueue || 
    //         oFunQueue.length <= 0) {
    //         return;
    //     }

    //     let funYesContinue = (): void => {
    //         if (oFunQueue.length <= 0) {
    //             return;
    //         }

    //         let curFun = oFunQueue.shift();

    //         if ("function" == typeof(curFun)) {
    //             curFun(funYesContinue);
    //         } else {
    //             funYesContinue();
    //         }
    //     }

    //     funYesContinue();
    // }

    static serize (...oFunQueue: Array<(funYesContinue: () => void) => void>) {
        if (null == oFunQueue || 
            oFunQueue.length <= 0) {
            return;
        }

        let functionYesContinue = (): void => {
            if (oFunQueue.length <= 0) {
                return;
            }

            let curFun = oFunQueue.shift();
            
            if ("function" == typeof(curFun)) {
                curFun(functionYesContinue);
            } else {
                functionYesContinue();
            }
        }

        functionYesContinue();
    }
}