# Resindimension v6

A Minecraft Bedrock add-on by Viroda1 that turns the Overworld into the corrupted Overres: dark resin grass, resin trees, vanilla golems, and the underground Croaking boss.

## Install

1. Create a ZIP archive containing the `behavior_pack` and `resource_pack` folders at its root, then rename it to `Resindimension_v6.mcaddon`.
2. Open `Resindimension_v6.mcaddon` with Minecraft Bedrock Edition.
3. Create or edit a world and activate both packs. Enable the Script API / Beta APIs required by your Bedrock version.
4. In the world, obtain the starter items with `/give @s resin:raw_resin 4` and `/give @s resin:totem_of_transcendence`.
5. Craft or place a `Resin Block`, hold the Totem of Transcendence, and right-click/use it on the block.

To import the packs separately, zip each folder with its `manifest.json` at the archive root and use the `.mcpack` extension instead.

## Included content

- `resin:resin_dimension`, an independent generated dimension with the old add-on's fixed-night ambience.
- `resin:resin_block` as the portal anchor.
- `resin:totem_of_transcendence` with a scripted block-targeted teleport.
- The legacy `resin_alter` and `resin_well` structure templates, registered as world-generation features.
- Natural vanilla iron and copper golems in the resin biomes; no custom mob definitions.
- Resin Edge, Resin Maul, resin axe, pickaxe, shovel, hoe, and a complete Resin armor set.
- Resin Nuggets and Resin Ingots for crafting.
- Gray Resin Log, Planks, Leaves, and Roots using the supplied Creaking-style palette.
- Resin Guide book, Resin Crystal, Resin Lantern, Resin Apple, Resin Chisel, Resin Bricks, and Resin Glass.
- A gray dimension atmosphere with custom fog and sky artwork.
- The Croaking, a large underground boss in the Deep End, drops the Heart of the Creak.
- The Heart of the Creak spreads orange corruption through Overworld soil, stone, and grass.
- Creative-menu and language registrations for the pack content.

## Compatibility note

The pack targets Bedrock 1.21 and the `@minecraft/server` 1.15 API. Mojang has changed custom-dimension generator schemas and script API versions across Bedrock releases; if your editor flags the dimension file, keep the identifier and update only the generator component to the schema used by your installed version.

The resource pack includes gray Creaking-inspired PNG textures for the resin block, wood, leaves, roots, nuggets, and ingots. Tools and armor still use readable vanilla fallback art; replace those atlas paths with custom PNGs for a fully bespoke equipment set, and add armor attachables when you want the armor to render with a dedicated model.

The structure templates were imported from the original `viroda1/resin-dimension` repository and are kept as binary `.mcstructure` assets because Bedrock does not use a JSON representation for them.