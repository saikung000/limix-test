import {
    __private,
    _decorator,
    CCInteger,
    Component,
    EventMouse,
    EventTouch,
    game,
    input,
    Input,
    Node,
    Scene,
    UITransform,
    Vec2,
    Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
    @property({ type: CCInteger })
    public speed: number;
    private curPos: Vec3 = new Vec3();
    @property({ type: UITransform })
    public canvas: UITransform;
    target: Vec2 = new Vec2();
    isHold: boolean;
    adjustInput: number;
    centerWidth: number;
    start() {
        this.node.getPosition(this.curPos);
        this.target = new Vec2(this.curPos.x, this.curPos.y);
        this.canvas.node.on(Input.EventType.MOUSE_DOWN, this.onClick, this);
        this.canvas.node.on(Input.EventType.MOUSE_MOVE, this.onHold, this);
        this.canvas.node.on(Input.EventType.MOUSE_UP, this.onRelease, this);
        this.adjustInput = this.canvas.width/game.canvas.width;
        this.centerWidth = game.canvas.width / 2
        console.log(this.canvas.width/game.canvas.width);
    }

    onClick(event: EventTouch) {
        this.isHold = true;
        this.target = event.getLocation();
        this.target.x = (this.target.x -  this.centerWidth) * this.adjustInput;
        console.log(event.getLocation().x + ":" + this.target.x);
    }

    onHold(event: EventMouse) {
        if (!this.isHold) return;
        this.target = event.getLocation();
        this.target.x = (this.target.x -  this.centerWidth) * this.adjustInput;
    }

    onRelease(event: EventMouse) {
        this.isHold = false;
    }

    update(deltaTime: number) {
        this.node.getPosition(this.curPos);

        let distance = this.target.x - this.curPos.x;
        let step = this.speed * deltaTime;
        let direction = distance >= 0 ? 1 : -1;

        let moveX = this.curPos.x + direction * step;

        // console.log(distance * direction  +":" +step)
        if (distance * direction <= step) {
            this.node.setPosition(
                new Vec3(this.target.x, this.curPos.y, this.curPos.y)
            );
        } else {
            this.node.setPosition(
                new Vec3(moveX, this.curPos.y, this.curPos.y)
            );
        }
    }
}
