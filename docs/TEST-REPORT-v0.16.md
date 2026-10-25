# v0.16 Verification

- Baseline: v0.15 (40 passing tests)
- Added: 9 tests for global movement, Gnat, Warp, Pixie, chain reset and simultaneous finishes
- Actual result: 49/49 tests pass; 100/100 smoke seeds complete
- One initial test fixture failed because it unintentionally landed on an Altar; corrected the fixture to isolate snapshot behavior. No production-rule change was made for that failure.
- Known limitations documented in README. These results do not establish full rule correctness or game balance.
