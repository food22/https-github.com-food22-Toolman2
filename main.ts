//% weight=0 color=#3CB371 icon="\uf0ad" block="Anime"
namespace Toolman {
    let check = 0;
    let run = 0;
    let mode = -1;

    /**
    * 運作中
    */
    //% blockId="Running" block="Play Run"
    //% blockGap=2 weight=5
    export function Running(): void {
        check = 0;
        if (mode != 0) {
            mode = 0;
        }
        ClearLight();
        led.plot(Math.floor(run / 3),2)
        run++;
        if (run == 15) run = 0;
    }

    /**
    * 偵測中
    */
    //% blockId="Checking" block="Play Check"
    //% blockGap=2 weight=4
    export function Checking(): void {
        run = 0;
        if (mode != 1) {
            mode = 1;
            ClearLight();
        }
        if (check == 0 || check == 5) {
            ClearLight();
            switch (check) {
                case 0:
                    led.plot(0,0);
                    led.plot(4,0);
                    led.plot(0,4);
                    led.plot(4,4); 
                    break;
                case 5:
                    led.plot(2,0);
                    led.plot(0,2);
                    led.plot(4,2);
                    led.plot(2,4); 
                    break;
            }
        }
        check++
        if (check == 10) check = 0;
    }

    /**
    * 準備中
    */
    //% blockId="Ready" block="Ready-Max Time %max|Now Time %now"
    //% blockGap=2 weight=3
    export function Ready(max: number, now: number): void {
        check = 0;
        run = 0;
        if (mode != 2) {
            mode = 2;
           ClearLight();
        }
        if (now < max / 6 * 5) {
            led.plot(1,Math.floor(now / (max / 6)));
            led.plot(3,Math.floor(now / (max / 6)));  
        } else if (now == max / 6 * 5) {
            ClearLight();
            led.plot(0,1);
            led.plot(1,1);
            led.plot(3,1);
            led.plot(4,1);
            for(let i = 0; i < 5; i++) led.plot(i,3);
        }
    }

   /**
    * 顯示距離
    */
    //% blockId="Distance" block="Play Distance %length"
    //% blockGap=8 weight=2
    export function Distance(length: number): void {
        check = 0;
        run = 0;
        if (mode != 3) {
            mode = 3;
            ClearLight();
        }
        if (length > 100 || length < 0) {
            led.plot(0,0);
            led.plot(4,0);
            led.plot(1,1);
            led.plot(3,1);
            led.plot(2,2);
            led.plot(3,3);
            led.plot(1,3);
            led.plot(0,4);
            led.plot(4,4);
            return;
        }
        let units = length % 10;
        let tens = (length - units) / 10;
        units--;
        tens--;
        for(let i = 0; i < 10; i++) {
            if (i <= units) {
                led.plot(i % 5, 3 + Math.floor(i / 5));
            } else {
                led.unplot(i % 5, 3 + Math.floor(i / 5));
            }
            if(i <= tens) {
                led.plot(i % 5, Math.floor(i / 5));
            } else {
                led.unplot(i % 5, Math.floor(i / 5));
            }
        }
    }

    /**
    * 讀取距離
    */
    //% blockId="GetDistance" block="Get GetDistance PinData%pinData|Accurate%accurate"
    //% blockGap=10 weight=0
    //% pinData.min=0 pinData.max = 1023

   export function GetDistance(pinData: number, accurate: boolean): number {
       return Math.floor(pinData / 1023 * 100 * 10 ** (accurate ? 1 : 0)) / 10 ** (accurate ? 1 : 0)
       }
}

//**關閉所有燈 */
    function ClearLight(): void {
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                led.unplot(j, i);
            }
        }
    }
