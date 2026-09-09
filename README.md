# Resindimension v2

A Minecraft Bedrock add-on starter with a custom dimension, a scripted Totem of Transcendence portal, resin gear, Cybiggers, Resin Wisps, and Copper Golems.

## Install

1. Zip `behavior_pack` and rename the archive to `Resindimension_v2_BP.mcpack`.
2. Zip `resource_pack` and rename the archive to `Resindimension_v2_RP.mcpack`.
3. Open both files with Minecraft Bedrock Edition.
4. Create or edit a world and activate both packs. Enable the Script API / Beta APIs required by your Bedrock version.
5. In the world, obtain the starter items with `/give @s resin:raw_resin 4` and `/give @s resin:totem_of_transcendence`.
6. Craft or place a `Resin Block`, hold the Totem of Transcendence, and right-click/use it on the block.

## Included content

- `resin:resin_dimension`, an independent generated dimension with the old add-on's fixed-night ambience.
- `resin:resin_block` as the portal anchor.
- `resin:totem_of_transcendence` with a scripted block-targeted teleport.
- The legacy `resin_alter` and `resin_well` structure templates, registered as world-generation features.
- Cybiggers, Resin Wisps, and Copper Golems.
- Resin Edge, Resin Maul, and a complete Resin armor set.
- Creative-menu and language registrations for the pack content.

## Compatibility note

The pack targets Bedrock 1.21 and the `@minecraft/server` 1.15 API. Mojang has changed custom-dimension generator schemas and script API versions across Bedrock releases; if your editor flags the dimension file, keep the identifier and update only the generator component to the schema used by your installed version.

The resource pack maps the new identifiers to readable vanilla fallback art so the pack remains visible immediately. Replace the referenced atlas paths in `resource_pack/textures/item_texture.json` and `resource_pack/textures/terrain_texture.json` with your own PNGs for final custom art, and add armor attachables when you want the armor to render with a dedicated model.

The structure templates were imported from the original `viroda1/resin-dimension` repository and are kept as binary `.mcstructure` assets because Bedrock does not use a JSON representation for them.