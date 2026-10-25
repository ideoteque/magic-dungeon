# Magic Dungeon Alpha v0.9 — Verification report

Status: **partial engine prototype; not full rules fidelity**.

## Implemented and exercised
- Source-grounded inventory: 20 hero names, 52 Chest cards, 36 Altar cards, counts by dungeon.
- Seeded RNG, snake draft 2–4 players, one hero per dungeon, trophy scoring, basic d6 movement, Dragon Challenge and Tripped.
- Chest draws, hand limit 2 (automatic discard is explicitly a **temporary bot policy**, not a game rule).
- Selected hero powers: Grok last-place bonus, Thorin Greedfoot last-place bonus, Olarin teleport, Yod-Ah flip (optional), Ignis double (optional), Pip disruption (optional).
- Selected Altar effects: Ancient Blessing, Shared Loot, Root Quake, Gust of Wind, Public Execution, and registration of ongoing events without applying their effects.
- Selected Chest actions: Speed Potion, Cursed Chest, Warp Pearl.
- All unimplemented card and trap effects are flagged in the event log.

## Not implemented / not safe to balance
- Remaining hero powers, all reaction timing, many Chest/Altar effects, trap magnitudes, chain priorities, ongoing modifiers, full CPU strategy, card choice UI, true per-step animation in new Rules Lab.
- Browser runtime and Safari/Koder behavior have **not** been verified.
- Legacy PLAY v0.6 is included separately, unmodified, with its approved animations.
- No claim of 88 card effects working, 20 hero powers working, or complete game balance.

## Run
`node --test tests/engine.test.mjs`

## Sources
- `GDD_Master_Specifications.md`, sections 2–8.
- `C01_Resolution_Order_v1.2_EN.md`, `C02_Consolidated_Audit_v0.7_EN.md` for further reconciliation.

## Rule conflicts requiring resolution
- GDD master section 4 lists board-space effects before hero powers; later C01 decisions reverse this. The latter is authoritative; current prototype has **not** implemented the full order.
- GDD master says exact 30 finish for all levels; later C02 decisions specify only Dragon Lair exact-roll challenge. Prototype follows later C02.
- Trap numeric amounts, exhaustion, full reaction/hand decision logic require verification.

## Automated smoke run (partial mechanics only)
`node tests/smoke.mjs` — 100 deterministic 2-player campaign seeds; **100 completed, 0 crashes, 0 turn-cap failures**. This checks flow stability only, **not balance or full game fidelity**. Results: `docs/smoke-output.txt`.
