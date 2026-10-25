# Alpha v0.12 — Reaction Window (partial)

## Scope
Added an explicit, opt-in Small Shield defensive reaction to the deterministic engine for directed harmful Chest effects: Prison Chains, Force Scroll, and each eligible target of Fire Wave. Shield is discarded before consequences; source Action card is consumed even when blocked. Illegal targets are rejected before opening the reaction window. Declining the reaction leaves the shield in hand.

The API `playCard(g, activePlayer, cardId, {target, shieldTargets: [defendingPlayerIndex]})` is a **test harness interface**, not yet a complete interactive reaction prompt. The existing browser UI has not been wired to ask defenders for reaction choices; it defaults to declining. No tactical CPU logic is claimed. Trap reactions and global-vs-directed distinctions remain pending verification against card texts.

## Tests actually run
`node --test tests/*.mjs`: 22 tests passed, 0 failed (includes 4 new Small Shield tests; 1 smoke-file wrapper). `node --check src/engine.mjs`: passed.

## Open issues
- UI reaction window and turn pause, CPU choice policy
- Other harmful abilities and traps need trigger mapping
- Existing hand overflow auto-discard is temporary and not official
- Remaining hero/card abilities, full timing and balance studies are not complete
