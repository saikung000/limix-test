import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Game2Scene")
export class Game2Scene extends Component {
    start() {
        console.log("Game2 Scene")
    }

    update(deltaTime: number) {}

    onClickBackButton() {
        director.loadScene("MainMenu", function () {});
    }
}
