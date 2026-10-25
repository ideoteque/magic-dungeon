# Alpha v0.10 verification (2026-10-24)

- Executed: `node --test tests/engine.test.mjs` -> 13/13 passed.
- Executed: `node tests/smoke.mjs` -> 100/100 partial-rule simulations completed.
- Added checks for movement history, failed Dragon Challenge without movement, and preservation of unimplemented action cards.
- Static inspection: UI dice animation does not consume game RNG; visual positions interpolate from engine movement events.
- Not executed: automated browser / iPad Safari visual test, complete official rule fidelity, human playtest, valid balance simulations.
- Known gaps: many Chest/Altar effects, most hero abilities, trap effects, reaction priority, CPU card strategy, hand choice, full UI integration.
- References: docs/GDD_Master_Specifications.md, docs/C01_Resolution_Order_v1.2_EN.md, docs/C02_Consolidated_Audit_v0.7_EN.md.
