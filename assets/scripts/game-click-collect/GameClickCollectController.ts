import { _decorator, CCInteger, Component, director, Node } from "cc";
import { BathroomToolType } from "./BathroomToolType";
const { ccclass, property } = _decorator;

@ccclass("GameClickCollectController")
export class GameClickCollectController extends Component {
    @property({ type: CCInteger })
    public maxCollect: number = 10;
    public isGameOver: boolean = false;

    public itemCollectMap: Map<BathroomToolType, number> = new Map<
        BathroomToolType,
        number
    >([
        [BathroomToolType.Page, 0],
        [BathroomToolType.RubberDuck, 0],
        [BathroomToolType.ShowerGel, 0],
        [BathroomToolType.ToothBrush, 0],
        [BathroomToolType.ToothPaste, 0],
    ]);

    public spawnAbleType: BathroomToolType[] = [
        BathroomToolType.Page,
        BathroomToolType.RubberDuck,
        BathroomToolType.ShowerGel,
        BathroomToolType.ToothBrush,
        BathroomToolType.ToothPaste,
    ];

    start() {
        this.spawnAbleType = [
            BathroomToolType.Page,
            BathroomToolType.RubberDuck,
            BathroomToolType.ShowerGel,
            BathroomToolType.ToothBrush,
            BathroomToolType.ToothPaste,
        ];
        this.isGameOver = false;
        for (let value of this.itemCollectMap.values()) {
            value = 0;
        }
    }

    public AddItem(typeItem: BathroomToolType) {
        var value = this.itemCollectMap.get(typeItem);
        this.itemCollectMap.set(typeItem, value + 1);
        console.log(typeItem + ":" + value);
        if (value + 1 == this.maxCollect) {
            const index = this.spawnAbleType.indexOf(typeItem, 0);
            if (index > -1) {
                this.spawnAbleType.splice(index, 1);
            }
            if (this.spawnAbleType.length == 0) {
                this.isGameOver = true
                console.log("Game Over")
                this.schedule(function() {
                    director.loadScene("MainMenu", function () {});
                }, 5);
            }
        }
    }

    update(deltaTime: number) {}
}
