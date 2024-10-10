import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        console.log("MainMenu Scene")
    }

    update(deltaTime: number) {
        
    }
}


