import { __private, _decorator, CCInteger, CCString, Component, Enum, Input, input, Node, Vec2, Vec3 } from 'cc';
import { BathroomToolType } from './BathroomToolType';
import { GameClickCollectController } from './GameClickCollectController';
const { ccclass, property } = _decorator;

@ccclass('ClickObjectView')
export class ClickObjectView extends Component {


    @property({type: CCInteger})
    public speedDrop :number

    @property ({type:Enum(BathroomToolType)})
    public type : BathroomToolType = BathroomToolType.Page
    gameClickCollectController: GameClickCollectController;
    
    start() {
        this.node.on(Input.EventType.MOUSE_UP, this.onClick, this);
    }
    


    update(deltaTime: number) {
        var x = this.node.position.x
        var y = this.node.position.y
        y -=  this.speedDrop;
        this.node.setPosition(new Vec3(x,y)) 

        if(y <= -800)
            this.node.destroy()
    }

    init(gameClickCollectController: GameClickCollectController) {
        this.gameClickCollectController = gameClickCollectController;
    }
    
    onClick()
    {

        this.gameClickCollectController.AddItem(this.type)
        this.node.destroy()
    }
}


