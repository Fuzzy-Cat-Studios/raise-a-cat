let Settings: {
    [key: string]: number;
} = {
    StartingHeight: 100,
    EndingHeight: 1,
    Time: 0.5,
    HowManyDropletsAtOnce: 200,
}

function ChangeSetting (setting_name: string, setting_value: number) {
    if (Settings[setting_name] !== undefined) {
        Settings[setting_name] = setting_value;
    }
}

export default {
    ChangeSetting,
    Settings,
}

export {
    ChangeSetting,
    Settings
}