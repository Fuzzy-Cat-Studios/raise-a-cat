import Roact from '@rbxts/roact'
import RainSettings from 'shared/RainSettings'

import Notify from 'shared/Notification'

const ScreenGui = script.FindFirstAncestorWhichIsA('ScreenGui')!

let RainSettingsGUI: Roact.Tree | undefined

const SettingsPanel = Roact.createElement('Frame', {
    Name: 'Settings',
    BackgroundTransparency: 0.5,
    BackgroundColor3: Color3.fromRGB(16, 16, 16),
    BorderSizePixel: 0,
    Position: new UDim2(0.5, 0, 0.5, 0),
    Size: new UDim2(0.25, 0, 0.5, 0),
    AnchorPoint: new Vector2(0.5, 0.5),
    Visible: false
}, {
    UICorner: Roact.createElement('UICorner', {
        CornerRadius: new UDim(0, 10)
    }),
    Collumn: Roact.createElement('Frame', {
        BackgroundTransparency: 0.2,
        BackgroundColor3: Color3.fromRGB(12, 12, 12),
        BorderSizePixel: 0,
        Position: new UDim2(0, 0, 0, 0),
        Size: new UDim2(0.25, 0, 1, 0),
        AnchorPoint: new Vector2(0, 0),
        LayoutOrder: 1
    }, {
        RainSettingsOpen: Roact.createElement('TextButton', {
            Text: 'Rain Settings',
            TextColor3: Color3.fromRGB(198, 198, 198),
            BackgroundColor3: Color3.fromRGB(6,6,6),
            BorderSizePixel: 0,
            Position: new UDim2(0, 0, 0, 0),
            Size: new UDim2(1, 0, 0.1, 0),
            AnchorPoint: new Vector2(0, 0),
            LayoutOrder: 2,
            BackgroundTransparency: 0.8,
            [Roact.Event.MouseButton1Click]: () => {
                if (RainSettingsGUI) {
                    Roact.unmount(RainSettingsGUI)
                    RainSettingsGUI = undefined
                } else {
                    const RainSettingsFrame = Roact.createElement('Frame', {
                        Name: 'RainSettings',
                        BackgroundTransparency: 0.2,
                        BackgroundColor3: Color3.fromRGB(16, 16, 16),
                        BorderSizePixel: 0,
                        Position: new UDim2(1, 0, 0, 0),
                        Size: new UDim2(0.75, 0, 1, 0),
                        AnchorPoint: new Vector2(1, 0),
                    }, {
                        UICorner: Roact.createElement('UICorner', {
                            CornerRadius: new UDim(0, 10)
                        }),
                        /**
                         * StartingHeight: 100,
                            EndingHeight: 1,
                            Time: 0.5,
                            HowManyDropletsAtOnce: 200,
                         */
 
                        HowManyDropletsAtOnce: Roact.createElement('TextLabel', {
                            Text: 'How many droplets to display?: ',
                            TextColor3: Color3.fromRGB(198, 198, 198),
                            BackgroundColor3: Color3.fromRGB(6,6,6),
                            BorderSizePixel: 0,
                            Position: new UDim2(0, 0, 0, 0),
                            Size: new UDim2(1, 0, 0.1, 0),
                            AnchorPoint: new Vector2(0, 0),
                            LayoutOrder: 3,
                            BackgroundTransparency: 0.8,
                            TextXAlignment: Enum.TextXAlignment.Left,
                        }, {
                            UICorner: Roact.createElement('UICorner', {
                                CornerRadius: new UDim(0, 10)
                            }),
                            TextBox: Roact.createElement('TextBox', {
                                Text: '200',
                                TextColor3: Color3.fromRGB(198, 198, 198),
                                BackgroundColor3: Color3.fromRGB(6,6,6),
                                BorderSizePixel: 0,
                                BackgroundTransparency: 1,
                                Position: new UDim2(0, 0, 0, 0),
                                Size: new UDim2(1, 0, 1, 0),
                                AnchorPoint: new Vector2(0, 0),
                                LayoutOrder: 4,
                                [Roact.Event.FocusLost]: (inst: TextBox) => {
                                    if (tonumber(inst.Text)) {
                                        if (tonumber(inst.Text)! <= 1000) {
                                            RainSettings.ChangeSetting('HowManyDropletsAtOnce', tonumber(inst.Text)!);
                                        } else {
                                            Roact.mount(Roact.createElement(Notify, {message:'You can only have a maximum of 1000 Water Droplets at once for lag reasons',ScreenTime:3}), ScreenGui)
                                        }
                                    } else {
                                        const mounted = Roact.mount(Roact.createElement(Notify, {message:'Please enter a number.',ScreenTime:3}), ScreenGui)
                                        task.spawn(()=>{
                                            task.wait(7)
                                            Roact.unmount(mounted)
                                        })
                                    }
                                }
                            }, {
                                UICorner: Roact.createElement('UICorner', {
                                    CornerRadius: new UDim(0, 10)
                                })
                            }),
                        }),
                    })

                    RainSettingsGUI = Roact.mount(RainSettingsFrame, ScreenGui.FindFirstChild('Settings'), 'Rain Settings Frame')
                }
            }
        }, {
            UICorner: Roact.createElement('UICorner', {
                CornerRadius: new UDim(0, 10)
            })
        }),
        UICorner: Roact.createElement('UICorner', {
            CornerRadius: new UDim(0, 10)
        })
    })
})

Roact.mount(SettingsPanel, ScreenGui, 'Settings')