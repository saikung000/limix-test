import {
    _decorator,
    Component,
    CCFloat,
    Prefab,
    Node,
    instantiate,
    Vec3,
} from "cc";
import { GameClickCollectController } from "./GameClickCollectController";
import { BathroomToolType } from "./BathroomToolType";
import { ClickObjectView } from "./ClickObjectView";
const { ccclass, property } = _decorator;

@ccclass("GameClickSpawnerController")
export class GameClickSpawnerController extends Component {
    @property({ type: GameClickCollectController })
    public gameClickCollectController: GameClickCollectController;

    @property({ type: CCFloat })
    public minXSpawnerPosition = 0;
    @property({ type: CCFloat })
    public maxXSpawnerPosition = 0;
    @property({ type: CCFloat })
    public minSpawnTime = 0;
    @property({ type: CCFloat })
    public maxSpawnTime = 0;

    @property({ type: Prefab })
    public pagePrefab: Prefab;
    @property({ type: Prefab })
    public rubberDuckPrefab: Prefab;
    @property({ type: Prefab })
    public showerGelPrefab: Prefab;
    @property({ type: Prefab })
    public toothBrushPrefab: Prefab;
    @property({ type: Prefab })
    public toothPastePrefab: Prefab;

    lastSpawnTime: number = 0;
    timeRandomSpawn: number;

    start() {
        this.timeRandomSpawn = this.getRandom(this.minSpawnTime, this.maxSpawnTime);
        
    }

    update(deltaTime: number) {
        const now = Date.now();
        const elapsedTime = now - this.lastSpawnTime;
        if (
            elapsedTime >=  this.timeRandomSpawn
        ) {
            this.createObject(this.getRandomBathroomToolType());
            this.timeRandomSpawn = this.getRandom(this.minSpawnTime, this.maxSpawnTime);
            this.lastSpawnTime = now;
        }
    }

    public createObject(type: BathroomToolType) {
        if (type == null) return;

        let node: Node;
        switch (type) {
            case BathroomToolType.Page:
                node = instantiate(this.pagePrefab);
                break;
            case BathroomToolType.RubberDuck:
                node = instantiate(this.rubberDuckPrefab);
                break;
            case BathroomToolType.ShowerGel:
                node = instantiate(this.showerGelPrefab);
                break;
            case BathroomToolType.ToothBrush:
                node = instantiate(this.toothBrushPrefab);
                break;
            case BathroomToolType.ToothPaste:
                node = instantiate(this.toothPastePrefab);
                break;
        }
        let clickObject = node.getComponent(
            "ClickObjectView"
        ) as ClickObjectView;
        clickObject.init(this.gameClickCollectController);
        node.parent = this.node;
        node.setPosition(
            new Vec3(
                this.getRandom(
                    this.minXSpawnerPosition,
                    this.maxXSpawnerPosition
                ),
                0,
                0
            )
        );
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomBathroomToolType(): BathroomToolType {
        const spawnAbleList = this.gameClickCollectController.spawnAbleType;
        if (spawnAbleList.length == 0) return null;
        const randomIndex = Math.floor(Math.random() * spawnAbleList.length);
        return spawnAbleList[randomIndex];
    }
}
