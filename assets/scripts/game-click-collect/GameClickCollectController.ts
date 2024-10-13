import { _decorator, Animation, CCInteger, Component, director, Node } from "cc";
import { BathroomToolType } from "./BathroomToolType";
import { ProgressBarView } from "../bar/ProgressBarView";
const { ccclass, property } = _decorator;

@ccclass("GameClickCollectController")
export class GameClickCollectController extends Component {
    @property({ type: CCInteger })
    public maxCollect: number = 10;

    @property({ type: ProgressBarView })
    public pageBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public rubberDuckBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public showerGelBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public toothBrushBar: ProgressBarView;
    @property({ type: ProgressBarView })
    public toothPasteBar: ProgressBarView;

    @property({type: Node})
    public GameOverPanel: Node
    @property({type : Animation})
    public GameOverPanelAnimation: Animation

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
        this.GameOverPanel.active = false
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
        value++;
        this.itemCollectMap.set(typeItem, value );
        console.log(typeItem + ":" + value);

        switch (typeItem) {
            case BathroomToolType.Page:
                this.pageBar.UpdateBar(value,this.maxCollect)
                break;
            case BathroomToolType.RubberDuck:
                this.rubberDuckBar.UpdateBar(value,this.maxCollect)
                break;
            case BathroomToolType.ShowerGel:
                this.showerGelBar.UpdateBar(value,this.maxCollect)
                break;
            case BathroomToolType.ToothBrush:
                this.toothBrushBar.UpdateBar(value,this.maxCollect)
                break;
            case BathroomToolType.ToothPaste:
                this.toothPasteBar.UpdateBar(value,this.maxCollect)
                break;
        }

        if (value == this.maxCollect) {
            this.checkCollectComplete(typeItem);
        }
    }

    private checkCollectComplete(typeItem: BathroomToolType) {
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
