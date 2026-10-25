# Alpha v0.15 — Test report

## Executed
- `node --test tests/*.test.mjs`: **40 passed / 0 failed** (33 inherited, 7 new).
- `node tests/smoke.mjs`: **100/100 completed**, with partial rules only.
- `node --check src/engine.mjs`: passed.

## Added regression coverage
1. Gnat rides a carrier onto a Chest without drawing its benefit.
2. Gnat does not ride when not sharing the departure square.
3. Pixie moves when Chiron's power activates.
4. Pixie's own movement does not recursively trigger Magic Siphon.
5. Warp swaps without triggering passing powers on intermediate spaces.
6. Warp can skip the main roll to swap, then turn advances.
7. Gnat/carrier simultaneous finish assigns first and second in active-turn order.

## Known gaps
- Some Gnat global simultaneous event effects and forced movement cases are not yet supported.
- Some Pixie power activations in unimplemented hero powers are not yet covered.
- Warp/third-party arrival triggers and finished-target glossary need further tests.
- No browser or iPad validation. Smoke games are not balance evidence.
