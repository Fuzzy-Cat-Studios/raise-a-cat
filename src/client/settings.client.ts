import Icon from '@rbxts/topbar-plus'

import { Players } from '@rbxts/services'

const PlayerGui = Players.LocalPlayer.FindFirstChildWhichIsA('PlayerGui')

assert(PlayerGui, 'PlayerGui not found')

const UI = PlayerGui.WaitForChild('UI')

assert(UI, 'UI not found')

const Settings = UI.FindFirstChild('Settings')

if (!Settings || !Settings.IsA('Frame')) {
    error('Settings not found')
}

const icon = new Icon()
icon.setImage('rbxassetid://9430313660')
icon.setLabel('Settings', 'deselected')
icon.setLabel('Settings', 'selected')

icon.selected.Connect(() => {
    Settings.Visible = true
    icon.setImage('rbxassetid://9430435065')
})

icon.deselected.Connect(() => {
    Settings.Visible = false
    icon.setImage('rbxassetid://9430313660')
})

icon.setMid()