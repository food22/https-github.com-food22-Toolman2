//% weight=0 color=#3CB371 icon="\uf0ad" block="ReadSignal"
namespace readSignal {
    let signalTime = 0
    let signalID = 0
    /**
    * 計算長方形面積，並回傳
    */
    //% blockId="areaOfRectangle" block="ReadSignal %signalArray"
    //% blockGap=2 weight=0
    export function areaOfRectangle(signalArray: number[]): void {
        while (pins.digitalReadPin(DigitalPin.P0) == 1)
        while (pins.digitalReadPin(DigitalPin.P0) == 0) {
            signalTime++
            if (signalTime > 3600 && signalID !=0) {
                signalTime = 0
                signalID = 0                
                return
            }
        }
        signalArray[signalID] = signalTime
        signalTime = 0
        signalID++
        while (pins.digitalReadPin(DigitalPin.P0) == 1) {
            signalTime++
            if (signalTime > 3600 && signalID !=0) {
                signalTime = 0
                signalID = 0                
                return
            }
        }
        signalArray[signalID] = signalTime
        signalTime = 0
        signalID        
        }
    }
}
