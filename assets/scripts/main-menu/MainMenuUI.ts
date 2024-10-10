import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MainMenuUI")
export class MainMenuUI extends Component {
    start() {}

    update(deltaTime: number) {}

    onButtonGame1Click() {
        director.loadScene("Game1", function () {});
    }

    onButtonGame2Click() {
        director.loadScene("Game2", function () {});
    }
}
