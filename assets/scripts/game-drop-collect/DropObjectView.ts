import {
    __private,
    _decorator,
    CCInteger,
    CCString,
    Component,
    Enum,
    Input,
    input,
    instantiate,
    Node,
    Prefab,
    tween,
    Vec2,
    Vec3,
} from "cc";
import { FruitType } from "./FruitType";
import { GameDropCollectController } from "./GameDropCollectController";

const { ccclass, property } = _decorator;

@ccclass("DropObjectView")
export class DropObjectView extends Component {
    @property({ type: CCInteger })
    public speedDrop: number;

    @property({ type: CCInteger })
    public destroyPosition: number = 200;

    @property({ type: Enum(FruitType) })
    public type: FruitType = FruitType.Apple;
    @property({ type: Prefab })
    public particlePrefab: Prefab;

    gameDropCollectController: GameDropCollectController;
    clicked: boolean = false;

    start() {
    }

    update(deltaTime: number) {
        var x = this.node.position.x;
        var y = this.node.position.y;
        y -= this.speedDrop;
        this.node.setPosition(new Vec3(x, y));

        if (y >= this.destroyPosition) this.node.destroy();
    }

    init(gameDropCollectController: GameDropCollectController) {
        this.gameDropCollectController = gameDropCollectController;
    }

    onCollect() {
        if (this.clicked) return;
        this.speedDrop = 0;
        this.clicked = true;
        let particle = instantiate(this.particlePrefab);
        particle.setPosition(this.node.position);
        particle.setParent(this.node.parent);
        tween(this.node)
            .to(
                0.3,
                { worldScale: new Vec3(1.3, 1.3, 1.3) },
                {
                    easing: "circIn",
                    onComplete: () => {
                        this.node.destroy();
                    },
                }
            )
            .start();
        this.gameDropCollectController.AddItem(this.type);
    }
}
