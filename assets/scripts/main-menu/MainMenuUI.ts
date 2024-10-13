import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MainMenuUI")
export class MainMenuUI extends Component {
    start() {}

    update(deltaTime: number) {}

    onButtonGame1Click() {
        director.loadScene("GameClickCollect", function () {});
    }

    onButtonGame2Click() {
        director.loadScene("GameDropCollect", function () {});
    }
}
