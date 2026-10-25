# Magic Dungeon — Alpha v0.29: Automatic Replay Journal

## Delivered
- `src/replay.mjs`: automatic command journal with initial deterministic snapshot, ordered commands, post-command checkpoints, replay export, integrity verification, and step-by-step re-execution.
- `src/persistence.mjs`: replay support for explicit debug position/trip commands and the Rules Lab's pre-roll RNG consumption.
- `index.html` (Rules Lab): automatically records draft (including CPU picks), hero selection, turns, played action cards, Phase Shift, level transitions and debug mutations; offers **Exportar replay**, **Importar replay**, **Ver replay**, **Anterior**, **Seguinte** and **Fechar replay**. Save/Load remains available; loading a save begins a new replay journal from that point.
- Replays are versioned JSON with an initial save, command list and checkpoints. Viewing a replay re-executes commands and compares the result to each checkpoint. It does not change the live game when closed.
- The approved `legacy-play-v0.6.html` and `board-studio.html` are byte-identical to v0.28.

## Verified
- `node --test tests/*.test.mjs`: **139 passed / 0 failed** (130 inherited + 9 new).
- `node --check` on extracted Rules Lab JavaScript: passed.
- `cmp` of PLAY v0.6 and Board Studio against v0.28: identical.

## Limitations and uncertainty
- This is a **Rules Lab command replay**, not frame-by-frame video playback. It does not reproduce animations, prompts or other external side effects.
- The replay begins at the creation of a new game or at the moment a save is loaded; it cannot reconstruct earlier history from an ordinary save.
- Journal recording is for successfully completed state-changing commands. Technical failures during the UI's pre-roll preview need more comprehensive failure injection and browser testing.
- Only engine commands and debug actions covered by the journal are replayable. Future mechanics/UI actions will require explicit command registration.
- No actual iPad/Safari visual validation has been run. Card and trap rules remain partially implemented; Pixie/Gronk remains unresolved.

## Traceability
| Requirement | Code | Tests |
|---|---|---|
| Automatic command journal | `src/replay.mjs` + Rules Lab `applyCommand` | `replay-journal-v029.test.mjs` |
| Deterministic CPU/UI die preview | `rngDraws` replay field | preview RNG test |
| Replay export and validation | `exportReplay`, `validateReplay` | checkpoint, malformed command tests |
| Step-by-step replay | `replayStep` and Rules Lab controls | step / draft / debug tests |
| Approved visuals preserved | untouched legacy PLAY and Studio | byte comparison |

## Decision log
- No gameplay rules were changed or invented.
- Replay UI is confined to the Rules Lab.
- Imported replay inspection is separate from live game state.

## Next steps
1. Test real Safari/iPad import, export, and replay navigation.
2. Extend command journal to future card and hero abilities as implemented.
3. Conduct guided playtests and close pending rules only with explicit approval.
