# Alpha v0.18 verification — 2026-10-24

- Automated Node tests: **59 passed, 0 failed**. See `test-output-v0.18.txt`.
- Smoke simulations: **100 completed, 0 failures**. See `smoke-v0.18.txt`. These are stability tests with incomplete mechanics, **not** balance simulations.
- Regression fixed during implementation: additional queue trace entry in `g.history` changed the expected last movement/reaction event. Trace was moved to `g.resolutionTrace` and the full suite rerun successfully.
- Added six tests: clockwise ordering, reaction-before-effect, stale destination cancellation, dynamically inserted reaction, cycle reporting, and legitimate repeated event names with changing state.
- PLAY and Studio files copied unchanged from v0.17 (verify via SHA-256 as needed).
- Pending: integration of queue across all nested effects; official rules ambiguity; iPad visual testing; full card/hero coverage.
