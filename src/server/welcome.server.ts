import { BadgeService, Players } from '@rbxts/services'


Players.PlayerAdded.Connect(plr => {
    if (!BadgeService.UserHasBadgeAsync(plr.UserId, 2125999486)) {
        BadgeService.AwardBadge(plr.UserId, 2125999486)
    }
})