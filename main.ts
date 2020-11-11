//% weight=0 color=#3CB371 icon="\uf0ad" block="ReadSignal"
namespace readSignal {
    let check = 0;
    let move = 0;
    let run = 0;
    let mode = -1;

    /**
    * 運作中
    */
    //% blockId="Running" block="Play Run"
    //% blockGap=2 weight=0
    export function Running(): void {
        check = 0;
        move = 0;
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
    //% blockGap=2 weight=1
    export function Checking(): void {
        move = 0;
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
    * 運作中
    */
    //% blockId="Moving" block="Play Move"
    //% blockGap=2 weight=2
    export function Moving(): void {
        check = 0;
        run = 0;
        if (mode != 2) {
            mode = 2;
           ClearLight();
        }
        if (move < 15) {
            led.plot(1,Math.floor(move / 3));
            led.plot(3,Math.floor(move / 3));  
        } else if (move == 15) {
            ClearLight();
            led.plot(0,1);
            led.plot(1,1);
            led.plot(3,1);
            led.plot(4,1);
            for(let i = 0; i < 5; i++) led.plot(i,3);
        }      
        move++;
        if (move == 20) {
            ClearLight();
            move = 0;
        }
    }

   /**
    * 顯示距離
    */
    //% blockId="Distance" block="Play Distance %length"
    //% blockGap=2 weight=3
    export function Distance(length: number): void {
        check = 0;
        move = 0;
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
    * 關閉所有燈
    */
    //% blockId="ClearLight" block="Clear Light"
    //% blockGap=2 weight=4
    export function ClearLight(): void {
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                led.unplot(j, i);
            }
        }
    }

    /**
    * 讀取移動時間
    */
    //% blockId="GetMoveTime" block="Get Move Time"
    //% blockGap=10 weight=5
   export function GetMoveTime(): number {
       return move;
       }
}
