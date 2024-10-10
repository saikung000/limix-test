import { __private, _decorator, CCInteger, CCString, Component, Enum, Input, input, Node } from 'cc';
import { BathroomToolType } from './BathroomToolType';
const { ccclass, property } = _decorator;

@ccclass('ClickObjectView')
export class ClickObjectView extends Component {

    @property({type: CCInteger})
    public speedDrop :number

    @property ({type:Enum(BathroomToolType)})
    public type : BathroomToolType = BathroomToolType.Page
    
    start() {
        this.node.on(Input.EventType.MOUSE_UP, this.onClick, this);
    }
    
    onClick()
    {
        console.log(this.type)
    }

    update(deltaTime: number) {
        
    }
}


