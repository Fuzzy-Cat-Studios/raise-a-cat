import { Lighting, TweenService, CollectionService } from "@rbxts/services";

const TimeInMinutes = 10

let currentLighting = 'Day'

const DimmableLights = CollectionService.GetTagged('DimmableLights') as Array<PointLight>

while (task.wait(TimeInMinutes*60)) {
    if (currentLighting === 'Day') {
        currentLighting = 'Night'
        TweenService.Create(Lighting, new TweenInfo(1), {
            ClockTime: 6
        }).Play()
        DimmableLights.forEach(light => {
            TweenService.Create(light, new TweenInfo(1), {
                Brightness: 0.5
            }).Play()
        })
    } else {
        currentLighting = 'Day'
        TweenService.Create(Lighting, new TweenInfo(1), {
            ClockTime: 11
        }).Play()
        DimmableLights.forEach(light => {
            TweenService.Create(light, new TweenInfo(1), {
                Brightness: 0.2
            }).Play()
        })
    }
}