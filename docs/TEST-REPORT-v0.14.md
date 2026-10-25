# Alpha v0.14 — verified interaction slice

Source: GDD Master Specifications section 6; C01 Resolution Order v1.2 (provisional user decisions).

Implemented in renderer-independent `src/engine.mjs`:
- CHIRON: passing an active opponent on a main forward move knocks them back 2.
- GROK: passing an active opponent on a main forward move knocks them back 1 (existing last-place roll bonus retained).
- GRONK: ejects non-finished occupants on arrival and rejects arrivals to his occupied non-START square. START (0) exempt.
- THORIN BREWBURN: landing on occupied non-START square pushes other active occupants back 3 and Trips them.
- VESPERA: when explicitly tagged forced backward, drags eligible nearby active heroes back by the same amount, range measured before movement.
- Movement-triggered powers run before destination board effects. Animation history records new `ability` events; existing `move` events remain intact.

Validation executed: `node --test tests/*.test.mjs` -> 33 passed, 0 failed (25 existing + 8 new). No real browser/iPad visual test executed. No balance conclusions.

Known limitations: chained trigger priority and loop detection are not complete; generic depth limit remains a safeguard, not the final C01 repeated-state rule. Multiple special-space resolutions and passing powers from magical moves require additional verification. Remaining hero powers and many cards/traps still pending. The PLAY v0.6 and Studio files were copied unchanged. Do not interpret this as full hero roster coverage.
