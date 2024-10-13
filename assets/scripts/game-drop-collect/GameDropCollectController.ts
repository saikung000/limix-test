import { _decorator, Animation, CCInteger, Component, director, Node, PhysicsSystem2D } from "cc";
import { ProgressBarView } from "../bar/ProgressBarView";
import { FruitType } from "./FruitType";
const { ccclass, property } = _decorator;

@ccclass("GameDropCollectController")
export class GameDropCollectController extends Component {
    @property({ type: CCInteger })
    public maxCollect: number = 10;

    @property({ type: ProgressBarView })
    public appleBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public bananaBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public grapeBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public orangeBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public strawberryBar: ProgressBarView;

    @property({type: Node})
    public GameOverPanel: Node
    @property({type : Animation})
    public GameOverPanelAnimation: Animation

    public isGameOver: boolean = false;

    public itemCollectMap: Map<FruitType, number> = new Map<
    FruitType,
        number
    >([
        [FruitType.Apple, 0],
        [FruitType.Banana, 0],
        [FruitType.Grape, 0],
        [FruitType.Orange, 0],
        [FruitType.Strawberry, 0],
    ]);

    public spawnAbleType: FruitType[] = [
        FruitType.Apple,
        FruitType.Banana,
        FruitType.Grape,
        FruitType.Orange,
        FruitType.Strawberry,
    ];

    start() {
        PhysicsSystem2D.instance.enable = true;
        this.GameOverPanel.active = false
        this.spawnAbleType = [
            FruitType.Apple,
            FruitType.Banana,
            FruitType.Grape,
            FruitType.Orange,
            FruitType.Strawberry,
        ];
        this.isGameOver = false;
        for (let value of this.itemCollectMap.values()) {
            value = 0;
        }
    }

    public AddItem(typeItem: FruitType) {
        var value = this.itemCollectMap.get(typeItem);
        value++;
        this.itemCollectMap.set(typeItem, value );
        console.log(typeItem + ":" + value);

        switch (typeItem) {
            case FruitType.Apple:
                this.appleBar.UpdateBar(value,this.maxCollect)
                break;
            case FruitType.Banana:
                this.bananaBar.UpdateBar(value,this.maxCollect)
                break;
            case FruitType.Grape:
                this.grapeBar.UpdateBar(value,this.maxCollect)
                break;
            case FruitType.Orange:
                this.orangeBar.UpdateBar(value,this.maxCollect)
                break;
            case FruitType.Strawberry:
                this.strawberryBar.UpdateBar(value,this.maxCollect)
                break;
        }

        if (value == this.maxCollect) {
            this.checkCollectComplete(typeItem);
        }
    }

    private checkCollectComplete(typeItem: FruitType) {
        const index = this.spawnAbleType.indexOf(typeItem, 0);
        if (index > -1) {
            this.spawnAbleType.splice(index, 1);
        }
        if (this.spawnAbleType.length == 0) {
            this.isGameOver = true;
            console.log("Game Over");
            this.GameOverPanel.active = true;
            this.GameOverPanelAnimation.play();

            this.scheduleOnce(function () {
                director.loadScene("MainMenu", function () { });
            }, 3);
        }
    }

    update(deltaTime: number) {}
}
