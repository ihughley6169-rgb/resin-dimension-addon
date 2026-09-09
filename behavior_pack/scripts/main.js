import { world, system, ItemStack } from "@minecraft/server";

const SOURCE_BLOCK = "resin:resin_block";
const TOTEM = "resin:totem_of_transcendence";
const TARGET_DIMENSION = "resin:resin_dimension";
const GUIDE = "resin:resin_guide";
const HEART = "resin:heart_of_the_creak";
const CROAKING = "resin:croaking";
const CORRUPTED = "resin:corrupted_resin";
const SOIL = "resin:resin_soil";

function spreadCorruption(dimension, center, radius) {
  for (let x = -radius; x <= radius; x += 1) {
    for (let z = -radius; z <= radius; z += 1) {
      if (x * x + z * z > radius * radius) continue;
      const block = dimension.getBlock({ x: Math.floor(center.x + x), y: Math.floor(center.y), z: Math.floor(center.z + z) });
      if (block && (block.typeId === "minecraft:grass_block" || block.typeId === "minecraft:dirt" || block.typeId === "minecraft:stone" || block.typeId === SOIL)) block.setType(CORRUPTED);
    }
  }
}

function growResinTree(dimension, center) {
  const ground = dimension.getBlock({ x: Math.floor(center.x), y: Math.floor(center.y) - 1, z: Math.floor(center.z) });
  if (!ground || ground.typeId !== "resin:resin_grass_block") return;
  for (let y = 0; y < 5; y += 1) dimension.getBlock({ x: Math.floor(center.x), y: Math.floor(center.y) + y, z: Math.floor(center.z) }).setType("resin:resin_tree_log");
  for (let x = -2; x <= 2; x += 1) {
    for (let y = 3; y <= 6; y += 1) {
      for (let z = -2; z <= 2; z += 1) {
        if (Math.abs(x) + Math.abs(z) + Math.max(0, y - 5) <= 3) dimension.getBlock({ x: Math.floor(center.x) + x, y: Math.floor(center.y) + y, z: Math.floor(center.z) + z }).setType("resin:resin_tree_leaves");
      }
    }
  }
}

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn || event.player.hasTag("resin_guide_received")) return;

  system.run(() => {
    const guide = new ItemStack(GUIDE, 1);
    guide.setLore([
      "By Viroda1",
      "",
      "THE RESIN REMEMBERS",
      "Long ago, the first resin altar",
      "opened a road beneath the fixed night.",
      "Use a Totem on a Resin Block to travel.",
      "",
      "FEATURES",
      "Craft nuggets, ingots, tools, armor,",
      "crystals, lanterns, glass, and bricks.",
      "Iron and copper golems roam the biomes.",
      "",
      "EXPLORE",
      "Resin Plains, Woods, and Marsh await.",
      "Old altars and wells hide useful materials.",
      "The gray sky is not empty. Listen."
    ]);
    event.player.getComponent("minecraft:inventory").container.addItem(guide);
    event.player.addTag("resin_guide_received");
  });
});

world.afterEvents.itemUse.subscribe((event) => {
  if (event.itemStack.typeId === HEART) {
    spreadCorruption(world.getDimension("minecraft:overworld"), event.source.location, 6);
    event.source.sendMessage("§6The Heart of the Creak takes root. The Overworld is changing.");
    event.source.playSound("block.sculk_spread");
    return;
  }
  if (event.itemStack.typeId !== GUIDE) return;

  event.source.sendMessage([
    "§7§lTHE RESIN GUIDE §r§7by Viroda1",
    "§fThe Resin remembers the builders who listen.",
    "§fUse a Totem of Transcendence on a Resin Block to travel.",
    "§fCraft resin nuggets, ingots, tools, armor, crystals, lanterns, glass, and bricks.",
    "§fExplore Resin Plains, Woods, and Marsh; old altars and wells hide materials.",
    "§fIron and copper golems roam beneath the gray fixed night."
  ].join("\n"));
  event.source.playSound("book.page_turn");
});

world.afterEvents.itemUseOn.subscribe((event) => {
  const { itemStack, block, source } = event;
  if (!itemStack || itemStack.typeId !== TOTEM || block.typeId !== SOURCE_BLOCK) return;

  const destination = world.getDimension(TARGET_DIMENSION);
  const location = {
    x: block.location.x + 0.5,
    y: block.location.y + 1,
    z: block.location.z + 0.5
  };

  system.run(() => {
    source.teleport(location, { dimension: destination, keepVelocity: false });
    source.sendMessage("§dThe resin remembers you. Welcome to Resindimension.");
    source.playSound("portal.travel");
  });
});

world.afterEvents.entityDie.subscribe((event) => {
  if (event.deadEntity.typeId !== CROAKING) return;
  event.deadEntity.dimension.spawnItem(new ItemStack(HEART, 1), event.deadEntity.location);
  event.deadEntity.dimension.runCommand(`say The Croaking has fallen. The Heart of the Creak is awake.`);
});

let corruptionPulse = 0;
system.runInterval(() => {
  corruptionPulse += 1;
  if (corruptionPulse % 200 === 0) {
    for (const player of world.getAllPlayers()) {
      if (player.dimension.id !== TARGET_DIMENSION) continue;
      growResinTree(player.dimension, { x: player.location.x + Math.floor(Math.random() * 17) - 8, y: player.location.y, z: player.location.z + Math.floor(Math.random() * 17) - 8 });
    }
  }
  if (corruptionPulse % 20 !== 0) return;
  for (const player of world.getAllPlayers()) {
    const heart = player.dimension.getEntities({ type: "minecraft:item", location: player.location, maxDistance: 12 }).some((entity) => entity.getComponent("minecraft:item")?.itemStack.typeId === HEART);
    if (heart && player.dimension.id === "minecraft:overworld") spreadCorruption(player.dimension, player.location, 3);
  }
}, 1);
