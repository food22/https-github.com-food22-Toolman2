//% weight=0 color=#3CB371 icon="\uf0ad" block="Tools"
namespace tools {
    let SignalTime = 0
    let SignalID = 0
    /**
    * 計算長方形面積，並回傳
    */
    //% blockId="areaOfRectangle" block="讀取信號 %length|width %width"
    //% blockGap=2 weight=0
    export function areaOfRectangle(SignalGroup: number[]): void {
        while  (pins.digitalReadPin(DigitalPin.P0) == 1)
        while (pins.digitalReadPin(DigitalPin.P0) == 0) {
            SingalTime++
            if (SignalTime > 3600 && SignalID !=0) {
                SignalTime = 0
                SignalID = 0                
                return
            }
        }
        SignalGroup[num] = SignalTime
        SignalTime = 0
        num = 0
        while (pins.digitalReadPin(DigitalPin.P0) == 1) {
            SingalTime++
            if (SignalTime > 3600 && SignalID !=0) {
                SignalTime = 0
                SignalID = 0                
                return
            }
        }
        SignalGroup[num] = SignalTime
        SignalTime = 0
        num = 0          
        }
    }
    /**
    * 計算長方形面積，不回傳，只顯示在LED
    */
    //% blockId="ledOfRectangle" block="show area of rectangle length %length|width %width"
    //% blockGap=2 weight=1
    export function ledOfRectangle(length: number, width:number): void {
        basic.showNumber(length*width)
    }
}
