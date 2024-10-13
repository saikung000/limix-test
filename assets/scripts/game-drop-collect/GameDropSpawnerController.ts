import {
    _decorator,
    Component,
    CCFloat,
    Prefab,
    Node,
    instantiate,
    Vec3,
} from "cc";

import { GameDropCollectController } from "./GameDropCollectController";
import { FruitType } from "./FruitType";
import { DropObjectView } from "./DropObjectView";
const { ccclass, property } = _decorator;

@ccclass("GameDropSpawnerController")
export class GameDropSpawnerController extends Component {

    @property({ type: GameDropCollectController })
    public gameDropCollectController: GameDropCollectController;

    @property({ type: CCFloat })
    public minXSpawnerPosition = 0;
    @property({ type: CCFloat })
    public maxXSpawnerPosition = 0;
    @property({ type: CCFloat })
    public minSpawnTime = 0;
    @property({ type: CCFloat })
    public maxSpawnTime = 0;

    @property({ type: Prefab })
    public applePrefab: Prefab;
    @property({ type: Prefab })
    public bananaPrefab: Prefab;
    @property({ type: Prefab })
    public grapePrefab: Prefab;
    @property({ type: Prefab })
    public orangePrefab: Prefab;
    @property({ type: Prefab })
    public strawberryPrefab: Prefab;

    lastSpawnTime: number = 0;
    timeRandomSpawn: number;
    isStart: boolean;

    start() {
        
        
    }

    startSpawn() {
        this.timeRandomSpawn = this.getRandom(this.minSpawnTime, this.maxSpawnTime);
        this.isStart = true;
    }

    update(deltaTime: number) {
        
        if(this.gameDropCollectController.isGameOver || !this.isStart) return;
        const now = Date.now();
        const elapsedTime = now - this.lastSpawnTime;
       
        if (
            elapsedTime >=  this.timeRandomSpawn
        ) {
            this.createObject(this.getRandomFruitType());
            this.timeRandomSpawn = this.getRandom(this.minSpawnTime, this.maxSpawnTime);
            this.lastSpawnTime = now;
        }
    }

    public createObject(type: FruitType) {
        if (type == null) return;

        let node: Node;
        switch (type) {
            case FruitType.Apple:
                node = instantiate(this.applePrefab);
                break;
            case FruitType.Banana:
                node = instantiate(this.bananaPrefab);
                break;
            case FruitType.Grape:
                node = instantiate(this.grapePrefab);
                break;
            case FruitType.Orange:
                node = instantiate(this.orangePrefab);
                break;
            case FruitType.Strawberry:
                node = instantiate(this.strawberryPrefab);
                break;
        }
        
        let dropObject = node.getComponent(
            "DropObjectView"
        ) as DropObjectView;
        dropObject.init(this.gameDropCollectController);
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

    getRandomFruitType(): FruitType {
        const spawnAbleList = this.gameDropCollectController.spawnAbleType;
       
        if (spawnAbleList.length == 0) return null;
        const randomIndex = Math.floor(Math.random() * spawnAbleList.length);
        return spawnAbleList[randomIndex];
    }
}
