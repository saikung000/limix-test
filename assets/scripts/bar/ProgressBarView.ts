import { _decorator, Component, Node, ProgressBar, Toggle } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ProgressBarView")
export class ProgressBarView extends Component {
    @property({ type: ProgressBar })
    public bar: ProgressBar;
    @property({ type: ProgressBar })
    public BGbar: ProgressBar;
    @property({ type: Toggle })
    public toggleMaxValue: Toggle;

    start() {
        this.toggleMaxValue.isChecked = false;
        this.bar.progress = 1
        this.BGbar.progress = 0;
    }

    update(deltaTime: number) {}

    public UpdateBar(value: number, max: number) {
        this.bar.progress = 1 - value / max;
        this.BGbar.progress = value / max;
        if (value == max) {
            this.toggleMaxValue.isChecked = true;
        }
    }
}
