import { Workspace as workspace, ReplicatedStorage, TweenService, Debris } from "@rbxts/services";

import { Settings as CONFIG } from "shared/RainSettings";

const RainDroplet = ReplicatedStorage.FindFirstChild("RainDroplet") as Part;

assert(RainDroplet, "RainDroplet not found");

const Baseplate = workspace.FindFirstChild("Grass") as Part;

assert(Baseplate, "Could not find the baseplate!");

const Effects = workspace.Terrain.FindFirstChild("Effects") as Folder;

assert(Effects, "Effects folder not found");

const RainDroplets = new Instance("Folder", Effects);

RainDroplets.Name = "RainDroplets";

/** Devforum my beloved
 * local RNG = Random.new()
 * local Part = workspace.Part
 * local Position = Part.Position
 * local Size = Part.Size
 *
 * local MinX , MaxX= Position.X - Size.X/2, Position.X + Size.X/2
 * local MinY, MaxY = Position.Y - Size.Y/2, Position.Y + Size.Y/2
 * local MinZ, MaxZ = Position.Z - Size.Z/2, Position.Z + Size.Z/2
 * local X, Y, Z = RNG:NextNumber(MinX, MaxX), RNG:NextNumber(MinY, MaxY), RNG:NextNumber(MinZ, MaxZ)
 *
 * local RanPosition = Vector3.new(X, Y, Z)
 */

function RandomPositionInPart(part: Part) {
	const RNG = new Random();
	const Position = part.Position;
	const Size = part.Size;

	const MinX = Position.X - Size.X / 2;
	const MaxX = Position.X + Size.X / 2;

	const MinY = Position.Y - Size.Y / 2;
	const MaxY = Position.Y + Size.Y / 2;

	const MinZ = Position.Z - Size.Z / 2;
	const MaxZ = Position.Z + Size.Z / 2;

	const X = RNG.NextNumber(MinX, MaxX);
	const Y = RNG.NextNumber(MinY, MaxY);
	const Z = RNG.NextNumber(MinZ, MaxZ);

	return {
		X,
		Y,
		Z,
	};
}

while (task.wait(CONFIG.Time+math.random(0.2,0.5))) {
	for (let i = 0; i < CONFIG.HowManyDropletsAtOnce; i++) {
		task.spawn(() => {
            const Time = CONFIG.Time+math.random(0.2,0.5)
			const droplet = RainDroplet.Clone();
			const PositionInPart = RandomPositionInPart(Baseplate);
			droplet.Position = new Vector3(PositionInPart.X, math.random(CONFIG.StartingHeight, CONFIG.StartingHeight+math.random(40,100)), PositionInPart.Z);
			Debris.AddItem(droplet, Time);
            const Touched = droplet.Touched.Connect((part) => {
                Touched.Disconnect()
                Debris.AddItem(droplet, 0)
            })
			TweenService.Create(droplet, new TweenInfo(Time), {
				Position: new Vector3(droplet.Position.X, CONFIG.EndingHeight, droplet.Position.Z),
			}).Play();
            droplet.Parent = RainDroplets;
		});
	}
}
