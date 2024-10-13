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
import { BathroomToolType } from "./BathroomToolType";
import { GameClickCollectController } from "./GameClickCollectController";
const { ccclass, property } = _decorator;

@ccclass("ClickObjectView")
export class ClickObjectView extends Component {
    @property({ type: CCInteger })
    public speedDrop: number = -3;

    @property({ type: CCInteger })
    public destroyPosition: number = 200;

    @property({ type: Enum(BathroomToolType) })
    public type: BathroomToolType = BathroomToolType.Page;
    @property({type : Prefab})
    public particlePrefab : Prefab

    gameClickCollectController: GameClickCollectController;
    clicked: boolean = false;

    start() {
        this.node.on(Input.EventType.MOUSE_UP, this.onClick, this);
    }

    update(deltaTime: number) {
        var x = this.node.position.x;
        var y = this.node.position.y;
        y -= this.speedDrop;
        this.node.setPosition(new Vec3(x, y));

        if (y >= this.destroyPosition) this.node.destroy();
        if (this.gameClickCollectController.isGameOver && !this.clicked) this.node.destroy();
    }

    init(gameClickCollectController: GameClickCollectController) {
        this.gameClickCollectController = gameClickCollectController;
    }

    onClick() {
        if(this.clicked) return
        this.speedDrop = 0
        this.clicked = true;
        let particle = instantiate(this.particlePrefab);
        particle.setPosition(this.node.position)
        particle.setParent(this.node.parent)
        tween(this.node)
            .to(0.3, {worldScale : new Vec3(1.3, 1.3, 1.3)}, 
            {
                easing: "circIn",
                onComplete: () => {
                    this.node.destroy();
                },
            })
            .start();
        this.gameClickCollectController.AddItem(this.type);
    }
}
