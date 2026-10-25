# Alpha v0.17 — executed verification

- `node --test tests/*.test.mjs`: 53 passed, 0 failed (49 regression + 4 new).
- `node tests/smoke.mjs`: see `smoke-v0.17.txt` for the executed output.
- Added checks for global Vespera movement with already-participating runners, START clamping, Warp simultaneous finishing order and stale destination cancellation after Gronk ejection.
- Global Vespera interpretation: all eligible runners already displaced by the same global event are not moved again by the drag. This avoids duplication; other chains remain unresolved.
- Known limitation: full priority queue, global occupancy and reactive windows, all cards and abilities, and arbitrary cycle arbitration are not implemented. These tests do not establish full official rules or balance.
- Browser/Safari/iPad visual checks were not run.
