import Roact, { setGlobalConfig } from "@rbxts/roact";
import Flipper from "@rbxts/flipper";
import { Debris } from "@rbxts/services";

// function Notify(mount: PlayerGui, message: string) {
//     const Notification = Roact.createElement('ScreenGui', {
//         Name: 'Notification',
//         DisplayOrder: math.pow(2,31) - 1,
//         IgnoreGuiInset: true,
//     }, {
//         Message: Roact.createElement('TextLabel', {
//             Text: message,
//             TextColor3: Color3.fromRGB(198, 198, 198),
//             BackgroundColor3: Color3.fromRGB(6,6,6),
//             BorderSizePixel: 0,
//             Position: new UDim2(0.5, 0, 1, 0),
//             Size: new UDim2(0.1, 0, 0.1, 0),
//             AnchorPoint: new Vector2(0.5, 1),
//             LayoutOrder: 1,
//             BackgroundTransparency: 0,
//             TextWrapped: true,
//             TextXAlignment: Enum.TextXAlignment.Center
//         }, {
//             UICorner: Roact.createElement('UICorner', {
//                 CornerRadius: new UDim(0, 10)
//             })
//         })
//     })

//     Roact.mount(Notification, mount, 'Notification')
// }

interface NotifyProps {
	message: string;
    ScreenTime: number;
}

class Notify extends Roact.Component<NotifyProps> {
	motor: Flipper.SingleMotor;
	binding: Roact.Binding<number>;

	constructor(props: NotifyProps) {
		super(props);

		this.motor = new Flipper.SingleMotor(0);
		const [biding, setBinding] = Roact.createBinding(this.motor.getValue());
		this.binding = biding;

		this.motor.onStep(setBinding);
	}

	public render(): Roact.Element | undefined {
		return Roact.createElement(
			"TextLabel",
			{
				Text: this.props.message,
				TextColor3: Color3.fromRGB(198, 198, 198),
				BackgroundColor3: Color3.fromRGB(6, 6, 6),
				BorderSizePixel: 0,
				Position: this.binding.map((value) => {
					return new UDim2(0.5, 0, 1, 0).Lerp(new UDim2(0.5, 0, 0.5, 0), value);
				}),
				Size: new UDim2(0.1, 0, 0.1, 0),
				AnchorPoint: this.binding.map((value) => {
					return new Vector2(0.5, 1).Lerp(new Vector2(0.5, 0.5), value);
				}),
				LayoutOrder: 1,
				BackgroundTransparency: 0,
				TextWrapped: true,
				TextXAlignment: Enum.TextXAlignment.Center,
			},
			{
				UICorner: Roact.createElement("UICorner", {
					CornerRadius: new UDim(0, 10),
				}),
			},
		);
	}

    protected didMount() {
        this.motor.setGoal(new Flipper.Spring(1, {
            frequency: 5,
            dampingRatio: 1,
        }))
        task.wait(this.props.ScreenTime)
        this.motor.setGoal(new Flipper.Spring(-1, {
            frequency: 4,
            dampingRatio: 0.75,
        }))
    }
}

export default Notify;
