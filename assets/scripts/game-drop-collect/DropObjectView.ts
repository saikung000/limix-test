import {
    __private,
    _decorator,
    BoxCollider2D,
    CCInteger,
    Collider2D,
    Component,
    Contact2DType,
    Enum,
    instantiate,
    IPhysics2DContact,
    PhysicsSystem2D,
    Prefab,
    tween,
    Vec3,
} from "cc";
import { FruitType } from "./FruitType";
import { GameDropCollectController } from "./GameDropCollectController";
import { PlayerController } from "./PlayerController";
const { ccclass, property } = _decorator;

@ccclass("DropObjectView")
export class DropObjectView extends Component
{

    @property({ type: CCInteger })
    public speedDrop: number = 1;

    @property({ type: CCInteger })
    public destroyPosition: number = 200;

    @property({ type: Enum(FruitType) })
    public type: FruitType = FruitType.Apple;
    @property({ type: Prefab })
    public particlePrefab: Prefab;

    gameDropCollectController: GameDropCollectController;
    isCollect: any;

    start() {
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        var x = this.node.position.x;
        var y = this.node.position.y;
        y -= this.speedDrop;
        this.node.setPosition(new Vec3(x, y));
        if (y <= this.destroyPosition) this.node.destroy();
    }

    init(gameDropCollectController: GameDropCollectController) {
        this.gameDropCollectController = gameDropCollectController;
    }

    onCollect() {
        if(this.isCollect) return
        this.isCollect = true;
        this.speedDrop = 0;
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

    onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) {
        console.log('onBeginContact');
        var player = otherCollider.getComponent(PlayerController);
        if (player) {
            this.onCollect();
        }
    }
}
