# Улучшение фотографий

Использован встроенный image_gen. Исходные миниатюры сохранены в assets/photos; сайт использует файлы *-restored.webp (1122 × 1402). Это ИИ-реставрация: мелкие фактуры и детали реконструированы, а не восстановлены из оригиналов. WebP quality 0.94, без дополнительного изменения размеров.

## bath-after

Use case: precise-object-edit. Edit target: supplied small photograph of a renovated bathroom. Restore this exact photograph in high resolution, ideally 1600x2000 or larger, same portrait 4:5 aspect. Remove compression blocks and pixelation, carefully recover natural photographic sharpness. Strictly preserve composition, camera angle, geometry, every object, tiles, gray curtain pattern, rectangular lit mirror, white sink cabinet with wood handle, black shower and shelves, white bathtub, wood casing at left. Do not redesign, beautify, add or remove anything; no changed framing or lighting, no text or watermark. This is a faithful restoration for a real renovation portfolio, not a new interior design. Output a single restored photo.

## bath-before-after

Use case: precise-object-edit. Input image is the edit target. Restore and upscale the entire supplied bathroom BEFORE/AFTER collage as a single photo, ideally 2240x2800 pixels, portrait 4:5. Preserve BOTH halves and their exact boundaries. Left half must remain old beige/brown floral tiles, old rounded sink cabinet, old chrome bathtub mixer, white bathtub, gray curtain, blue stool; right remains renovated white bathroom with black shower, lit rectangular mirror, new rectangular sink cabinet and wood casing. Do not renovate the before half or change either scene. Keep camera angles, objects, proportions, divider and framing unchanged. Remove visible compression blocks, aliasing and blur. Recover natural photographic detail conservatively. This is restoration of a real renovation portfolio photo, not a redesign. No new objects, altered geometry, invented text, watermarks, dramatic relighting or plastic CGI textures. Output one restored image.

## tv-console

Use case: precise-object-edit. Input image is the edit target. Restore and upscale the exact supplied TV console photo, ideally 1600x2000 pixels, portrait 4:5. Preserve the black television and its feet, black cabinet doors, wood top and sides, black angled legs, cream vase with dried grass at left, black floor lamp at right, patterned wall and light floor. Keep every object, composition, perspective, lighting and color unchanged. Remove visible compression blocks, aliasing and blur. Recover natural photographic detail conservatively. This is restoration of a real renovation portfolio photo, not a redesign. No new objects, altered geometry, invented text, watermarks, dramatic relighting or plastic CGI textures. Output one restored image.

## cabinet

Use case: precise-object-edit. Input image is the edit target. Restore and upscale the exact supplied black cabinet BEFORE photo, ideally 1600x2000 pixels, portrait 4:5. Preserve its WHITE top, black doors and black sides, angled black feet, empty gray wall and light floor. No television, no wood finish, no added decorations. Keep composition, perspective, lighting and framing exactly unchanged. Remove visible compression blocks, aliasing and blur. Recover natural photographic detail conservatively. This is restoration of a real renovation portfolio photo, not a redesign. No new objects, altered geometry, invented text, watermarks, dramatic relighting or plastic CGI textures. Output one restored image.

## towel-warmer

Use case: precise-object-edit. Input image is the edit target. Restore and upscale the exact supplied chrome serpentine towel warmer photograph, ideally 1600x2000 pixels, portrait 4:5. Preserve all chrome tube bends and topology, exact number of bars, two red shutoff valves at right, beige square tile grid, shadows and reflections. Do not make it black, change fittings or redesign it. Preserve framing and camera angle. Remove visible compression blocks, aliasing and blur. Recover natural photographic detail conservatively. This is restoration of a real renovation portfolio photo, not a redesign. No new objects, altered geometry, invented text, watermarks, dramatic relighting or plastic CGI textures. Output one restored image.
