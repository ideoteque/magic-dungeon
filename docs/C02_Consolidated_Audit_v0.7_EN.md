# Magic Dungeon — C02 Consolidated Audit & Decision Register
**v0.6 | English rules master | 2026-10-22 | PROVISIONAL | Documentary audit only — no code tests, simulations, or physical playtests executed**

## 1. Newly approved decisions (supersede proposals in v0.5)

### C02.9-B — No substitute for a finished leader
When an effect specifically targets the hero holding a previously awarded finishing place (e.g., "1st place hero" or "2nd place hero"), and that hero has finished and been removed under C02.6-A, the effect has no legal target and does not retarget the highest-positioned unfinished hero. It **fizzles**, except for any separately specified independent effect. **Do not silently reinterpret "1st place" as "leader among unfinished heroes".**

**Scope/ambiguity:** The approved choice concerns effects whose designated original leader/placing has finished. The GDD also uses "lead hero", "hero in 1st place", "last place" and "2nd place hero" dynamically. The exact meaning of these phrases *before* any hero finishes, and effects that explicitly select a new current leader rather than a previously awarded finisher, still need a glossary. Until clarified, flag such interactions instead of fabricating new targets.

### C02.10-A — Gnat may finish through Piggyback
If Gnat legally accompanies a carrier to the finish, both can finish. When the arrival is a genuinely simultaneous event, apply C02.7-A: rank eligible finishers from the same pre-event state, active player first, then clockwise; stop once the second place is awarded (C02.4-B). This does **not** permit duplicate movement when both Gnat and carrier are assigned movement by the same global effect (C01-T15-A/C01-T16-A).

**Open implementation detail:** Precisely define whether a carrier's finish and Piggyback are atomic when the carrier reaches space 30. This must be specified before executable assertions about their simultaneous arrival; do not let a sequential event queue inadvertently remove the carrier and cancel Gnat's already-valid ride.

### C02.11-A — Oracle earns an additional first-place-equivalent award
If the hero secretly chosen by The Oracle earns first place, the actual winner receives their normal first-place Trophy Points **and** Oracle separately receives an award equal to the first-place points for that Dungeon. This is an additional award, not a transfer of the winner's points. Oracle does not automatically physically finish or become untargetable from the award. Keep the secret selection and roll-donation ability as written in GDD §6.

**Open:** Timing of Oracle's payment relative to immediate race end; whether a chosen hero may be Oracle itself; how multiple Oracle copies/players would stack; and whether a point award is allowed to make totals exceed the ordinary pool. Do not assume extra restrictions not found in GDD.

### C02.12-A — Molten Gold cost is paid before movement and finish
For a valid target of Molten Gold (GDD §8), apply **−2 Trophy Points first**, then advance that hero **+2 spaces**. If that independent magical advance legally reaches/exceeds space 30, the hero finishes immediately under C02.5-P; the point loss remains committed and is not cancelled by C02.4-B. If the target has already finished and is ineligible under C02.6-A/C02.9-B, do not apply either effect.

**Open:** Whether Trophy Points may go negative, or are floored at zero, is not settled by these decisions; numerical examples involving insufficient points must remain conditional.

## 2. Prior C02 decisions preserved
- **C02.1-R1:** Dungeons 1–3: main movement reaching/exceeding 30 finishes; excess ignored.
- **C02.1-R2–R5:** Dungeon 4: exact main movement finishes; main-move overshoot forces Dragon Challenge. Roll dragon d20 then hero d20. Hero must strictly beat dragon to finish; ties and losses leave hero in place and Tripped.
- **C02.2-A:** Passing = start behind and end ahead in the same movement (note that GDD's "passing over" text may require a separate ability-specific interpretation).
- **C02.3-A:** Backward movement cannot pass space 0.
- **C02.4-B:** Second finisher ends the race immediately; pending effects are cancelled.
- **C02.5-P:** Independent magical advances from hero powers, Chests and Altars can finish by reaching/exceeding 30, including Dungeon 4; no Dragon Challenge. Main-roll modifiers count as main movement.
- **C02.6-A:** Finished heroes are removed from the active track, untargetable, placing locked.
- **C02.7-A:** Genuinely simultaneous eligible finishes rank active player then clockwise.
- **C02.8-A:** A legal teleport/swap arrival at 30 may finish; no targeting finished heroes; no new teleport capability is granted.

## 3. GDD/C01 compatibility audit
| Source / rule | Result | Implication |
|---|---|---|
| GDD §5 exact finish on all levels | **INTENTIONAL OVERRIDE** | New Dungeon 1–3 reach-or-exceed and Dungeon 4 Dragon Challenge must replace original GDD text in a future master revision. |
| GDD §6 Boba Grappling Hook (lead hero) | **CONDITIONAL** | If designated original leader has finished, no fallback target under C02.9-B. Dynamic "lead" semantics still require glossary. |
| GDD §6 Olarin Blundered Teleport (1st place) | **CONDITIONAL** | Cannot swap with finished first-place hero; if that is the specified target, swap fizzles. Its rolled 1 is not a Dragon Challenge overshoot. |
| GDD §7 Warp Pearl (1st place) | **CONDITIONAL** | No replacement unfinished leader when finished first-place target is ineligible. Card's precise target timing needs wording. |
| GDD §8 Dragon Swap (2nd place) | **CONDITIONAL** | If second-place finisher is already removed, no replacement. Usually race has already ended upon second finish, so ordinary post-finish use is impossible; avoid constructing illegal scenarios. |
| GDD §6 Gnat Piggyback | **ALIGNED, TIMING OPEN** | Gnat may finish with carrier. C01-T15/T16 forbid double movement on shared global events. Atomic finish/ride ordering unresolved. |
| GDD §6 Oracle Prophecy of Sacrifice | **NEW CLARIFICATION** | Additional first-place-equivalent award; actual winner still scores; Oracle remains racing unless physically finished. |
| GDD §8 Molten Gold | **ALIGNED, EDGE OPEN** | Point loss committed before +2; arrival can win; negative-points floor undefined. |
| C01 hero abilities before spaces; chains before space effects | **ALIGNED EXCEPT RACE END** | C02.4-B is an explicit interrupt when second finish occurs. |
| C01 simultaneous trigger order | **ALIGNED WITH C02.7** | Active player then clockwise; simultaneous finish eligibility from common pre-event snapshot. |
| C01 Pixie / Gronk / Inigo decisions | **ALIGNED, TEST NEEDED** | Finished heroes cannot be displaced/targeted; Pixie reaction can finish; Inigo duel needs actual shared occupancy. |
| C01-T11 final-position space activation | **ALIGNED** | A hero who finishes and exits does not subsequently activate pending destination spaces. |

## 4. High-priority open specifications before implementation
1. **Atomic finish/ride/global events:** When an effect moves multiple heroes or triggers Piggyback, collect valid simultaneous arrivals from one snapshot, then award first/second; distinguish already committed costs from pending effects. Define what other global consequences survive an immediate second finish.
2. **Target glossary:** "first place", "lead hero", "leader", "second place", "last place", and their semantics during a race versus awarded finish places. C02.9-B prohibits automatic retargeting after the originally designated finisher is removed.
3. **Oracle scoring event:** Determine when extra points are granted if the first-place arrival ends the race because another finisher already exists, and whether multiple Oracle claims are permitted.
4. **Points lower bound:** Molten Gold with 0 or 1 Trophy Point; define whether negative totals are legal.
5. **Main-roll versus independent movement:** Classify every movement effect, including chained modifiers and turn donation, to apply Dungeon 4 Dragon Challenge correctly.
6. **Passing definition vs source wording:** C02.2-A may exclude some "passing over" effects on equal final position; audit Chiron/Slink/Crackles with step-level movement and the final-state trigger rule.

## 5. Next deterministic batch (specifications only; NOT EXECUTED)
| ID | Setup / action | Expected result or blocked condition |
|---|---|---|
| C02-B01 | First-place finisher removed; Warp Pearl targets first place | No replacement target; fizzle, assuming first-place finisher is designated target. |
| C02-B02 | First-place finisher removed; Olarin rolls 1 | No swap with finisher; no substitute target; remaining turn handling to specify. |
| C02-B03 | First-place finisher removed; Boba targets original leader | No displacement of finished hero; clarify whether source wording selects a dynamic current leader. |
| C02-B04 | Global +3 from 28 finishes Gnat and carrier | Both eligible; order by active player/clockwise; atomicity rule needed. |
| C02-B05 | Gnat rides carrier to 30 as second finisher | Gnat's finish must not be silently dropped by early removal; precise event ordering blocked. |
| C02-B06 | Global event assigns different moves to Gnat/carrier | Each takes assigned move once; no extra Piggyback (C01-T16-A). |
| C02-B07 | Oracle predicts actual first-place finisher in Dungeon 4 | Winner +6 Trophy Points; Oracle +6 additional; no Oracle auto-finish. |
| C02-B08 | Oracle prediction fails | No prophecy award; ordinary scoring unchanged. |
| C02-B09 | Oracle predicted hero wins when this is the second finish event | Payment timing needs event atomicity rule. |
| C02-B10 | Molten Gold: eligible leader at 29 with ≥2 points | Deduct 2 first, advance +2, finish; no Dragon Challenge. |
| C02-B11 | Molten Gold: eligible leader at 29 with 0 points | BLOCKED: negative-point/floor rule. |
| C02-B12 | Molten Gold attempts to affect already finished first-place hero | No target, no point loss, no movement; no automatic retarget. |
| C02-B13 | Two heroes simultaneously finish from one global event, none finished yet | First and second by active-player-first clockwise; stop race. |
| C02-B14 | Three heroes simultaneously eligible for finish | Award first two by priority; third not classified; global atomicity to clarify. |
| C02-B15 | Dungeon 4 main d6 overshoots; dragon d20 ties hero d20 | Dragon wins; hero remains and becomes Tripped. |
| C02-B16 | Dungeon 4 independent Chest/Altar +3 from 28 | Finish without Dragon Challenge. |
| C02-B17 | Pixie power-triggered +1 reaches 30 as second finisher | Immediate race end; other pending effects cancelled. |
| C02-B18 | Teleport swaps with unfinished hero not on 30 | No finish unless legal arrival actually at 30. |

**Proposed test execution plan:** first deterministic Vitest cases with seeded/random-injected d6/d20, then automated race simulations with controlled bot policies and paired seeds; compare Dungeon 4 exact-only baseline versus Dragon Challenge and special magical finish rules. Record duration, finish source, turn skips, Oracle point contribution, fizzle rate, ties, and illegal targeting. This is a proposed plan, not an execution report. Human tabletop tests are still necessary to assess fun.

## 6. Decision / source log
- **2026-10-22:** User approved **C02.9-B, C02.10-A, C02.11-A, C02.12-A** provisionally. These supersede v0.5's proposed unfinished-leader retargeting convention.
- Primary source: `/mnt/data/GDD_Master_Specifications.md`, §§5–8 and race-end sections.
- Prior decisions: `C01_Resolution_Order_v1.1_EN.md`, `C01_Decision_Update_v1.1_EN.md`, `C02_Consolidated_Decisions_v0.5_EN.md` and `C02_Special_Finishes_Decisions_v0.4_EN.md`.
- **No code tests, simulation batches, or physical playtests were executed.**


## Cross-chapter update — Chest / Altar timing (2026-10-22)

**USER-APPROVED PROVISIONAL:** Chest **Action** and **Reaction** types remain distinct, with separate timing windows. An eligible final landing on an **Altar**, including one caused by ability- or trap-forced movement, draws one Altar card from the current Dungeon level; reveal/read aloud and resolve its event immediately. Mere passage does not activate an Altar. C01 hero-reaction-first and final-destination eligibility rules remain in force; C02 immediate second-finisher race end interrupts unprocessed effects. See `C01_C02_Chest_Altar_Timing_v0.2_EN.md`, CA-01–CA-09 and CA-T01–CA-T12. This update does not claim executed tests.
