import { world, system } from "@minecraft/server";

const SOURCE_BLOCK = "resin:resin_block";
const TOTEM = "resin:totem_of_transcendence";
const TARGET_DIMENSION = "resin:resin_dimension";

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
