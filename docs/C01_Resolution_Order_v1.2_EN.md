# MAGIC DUNGEON — C01: Resolution Order
**Draft v1.1 | English master | PROVISIONAL — NOT PLAYTESTED**

## Editorial status
This chapter consolidates 25 provisional C01 decisions, including C01-T16-A. It is not yet an approved final rulebook. It supersedes the contradictory priority order in the GDD's *Strict Reaction Priority* only as a proposed revision. This document does not change the original GDD.

## 1. Core resolution principle
Resolve triggered hero abilities before resolving destination board-space effects. If multiple abilities trigger simultaneously, the active player's eligible abilities resolve first, followed by the other players' abilities in clockwise player order. If multiple board-space effects trigger simultaneously, use the same player order. **C01-T13-A:** Fully resolve the selected space effect and all effects in its resulting chain before proceeding to the next player's pending space effect. Before processing any still-pending destination activation, recheck that its hero still occupies the relevant space (C01-T11-A).

## 2. Movement and reactions
Complete the movement that triggers an ability. Resolve that ability without interrupting an action already in progress. Abilities may cause further movement and trigger other abilities. Continue resolving these reactions before processing pending destination board-space effects. Resolve additional movement from abilities before processing the destination space of the moving hero.

## 3. Destination spaces
A hero who ends a movement on a special space may trigger that space, even when the movement was caused by another hero's ability or by a trap. Resolve all pending hero reactions before resolving board-space effects. If a space effect moves a hero to another special space, the new destination can trigger too, after any newly triggered hero reactions. Apply specific hero exceptions. **C01-T11-A:** Only the hero's final position after all hero reactions determines which destination space activates. If the hero leaves a special space before that space resolves, cancel its unprocessed activation. A space effect that has already begun resolving is not retroactively cancelled.

## 4. Infinite loops
If a combination of effects would repeat indefinitely, resolve one full repetition in priority order, then stop that repeating loop. Continue resolving any independent pending effects. **C01-T03-A — Repeated relevant state:** A loop is identified only when the same relevant game state recurs during one resolution chain: involved heroes’ positions, ability-trigger conditions, pending effects, and any other game variables capable of changing the outcome. Repeating an ability name alone is not proof of a loop. When a relevant state recurs with no progress towards termination, apply C01.9-A: stop the repeating cycle after its complete repetition; resolve independent pending effects. The table-side recognition procedure still needs physical validation.

## 5. Character-specific rulings
- **Gnat — Piggyback:** When riding another hero, Gnat does not gain beneficial Chest or Altar effects, but does suffer harmful trap effects. The carrying hero resolves their own destination normally. Mixed-benefit/mixed-harm effects remain OPEN pending review of actual card targeting; no printed board trap currently specifies a simultaneous benefit and penalty.
- **Gnat — Global Altar Events (C01-T14-A):** Gnat is affected by a global Altar event whenever Gnat meets the targeting conditions stated on that card, like any other hero. Piggyback does not create an additional Altar activation or duplicate an event’s effects. When a single global event moves Gnat and a hero sharing his space simultaneously, Gnat resolves only the movement assigned to him by that event; Piggyback does not add movement from the same event (C01-T15-A). A later independent movement may trigger Piggyback normally.
- **Gnat — Simultaneous Movement (C01-T15-A):** If one global event moves Gnat and a hero sharing his space, Gnat moves once according to the event. Piggyback does not add a second movement from that same event. Later independent movement may trigger Piggyback if its conditions hold.
- **Vespera — Grave Embrace:** Measure the 3-space target range from Vespera’s position immediately before her forced backward movement (C01-T01-A). An eligible target may be dragged back the same distance. Forced movement may trigger additional abilities and chains, subject to the infinite-loop rule.
- **Gronk — Immovable Object:** Other heroes cannot remain on Gronk's space. A hero arriving there is moved to the immediately preceding space; when Gronk enters an occupied space, its occupants are moved to the immediately preceding space. This ejection is forced movement and can trigger eligible hero abilities and destination-space effects (C01-PKG-G-A), following the normal resolution order. **Space 0 (START) is a permanent exception**, including after heroes return to it.
- **Inigo — Duel!:** Inigo cannot interrupt an ability currently being resolved. A duel requires actual shared occupancy after the relevant movement or effect is complete; merely passing through Inigo’s space does not qualify (C01-PKG-I-A).
- **Warp — Phase Shift:** A position swap is simultaneous teleportation, not travel across intervening spaces. It does not trigger passing abilities or intermediate board spaces. Applicable destination effects can trigger, subject to other rules. **C01-T07-A:** Arrival by teleportation can trigger abilities conditioned on occupying or sharing the destination space, if those conditions are actually met. Because the swap is simultaneous, the two swapped heroes do not automatically share a space with each other. Third-party occupants and Gronk’s exclusion must be evaluated after the swap.
- **Pixie — Magic Siphon:** Move 1 space for each distinct eligible activation of another hero’s power, including legitimate repeat activations of the same power (C01-PKG-P-A). Count each actual activation once; do not count resulting movement as a second activation of the same power. The GDD says “another power,” so Pixie’s own Magic Siphon activation is not a self-trigger. Resolve triggered movements and the repeated-state loop guard normally. Exact timing when multiple triggers occur simultaneously remains subject to the general priority rule.

## 6. Quick reference (table-side)
1. Finish the current movement or effect.
2. Identify triggered hero abilities.
3. Resolve abilities: active player, then clockwise. Do not interrupt an effect in progress.
4. Resolve any ability-driven movements and further hero reactions.
5. Resolve pending destination spaces: active player, then clockwise. Finish each space-effect chain before moving to the next player; recheck pending activations against final positions.
6. If a space moves a hero, return to step 2 for that new movement.
7. Detect loops by recurrence of the same relevant state (positions, trigger conditions and pending effects), not by repeated ability names alone. Stop the repeating cycle after one complete repetition.
8. Apply character exceptions and any unresolved end-of-race rules once defined.

**Important:** Cancel an unprocessed destination-space activation if the hero leaves that space during reactions; check the final destination instead (C01-T11-A). This is a provisional rule, not yet playtested.

## 7. Physical tabletop test scenarios (NOT EXECUTED)
Use the actual level boards and hero cards. Record each trigger, space activation, and final position. Mark an outcome **OPEN** when the current text does not determine it.

| Test | Setup / action | Expected check | Status |
|---|---|---|---|
| C01-T01 | Chiron passes Vespera, forcing her backward; Pixie is in play. | Chiron's ability resolves; Vespera's eligible response and Pixie's separate triggers resolve before destination spaces. | NOT RUN |
| C01-T02 | A trap sends a hero onto a Chest space. | The Chest activates after any hero reactions from the forced movement, subject to hand limits. | NOT RUN |
| C01-T03 | A trap sends a hero onto another trap that moves them again. | Continue the chain; compare relevant states (positions, trigger conditions, pending effects) and stop only when the same state recurs without progress. | NOT RUN |
| C01-T04 | Two heroes are moved simultaneously onto different special spaces. | Active player's destination resolves first, then clockwise. | NOT RUN |
| C01-T05 | Gronk and two heroes occupy START, then return to START later. | Sharing space 0 is allowed throughout the race. | NOT RUN |
| C01-T06 | Gronk enters an occupied non-START space. | Occupants are moved one space behind Gronk; evaluate new destination effects. | NOT RUN |
| C01-T07 | Warp swaps positions with a hero, crossing other figures in track order; inspect any third hero at the destination. | **PROVISIONAL:** No passing triggers or intermediate spaces. Occupancy/sharing abilities can trigger only if their actual conditions hold after simultaneous swap. | NOT RUN |
| C01-T08 | Thorin Brewburn lands on Inigo, knocking and tripping him. | Thorin's effect completes before Inigo can declare a duel; check whether they still share a space. | NOT RUN |
| C01-T09 | Gnat piggybacks onto a Chest, then separately onto a harmful trap. | Gnat gets no Chest benefit, but suffers harmful trap effect. | NOT RUN |
| C01-T10 | A finite chain causes Pixie to react more than once. | Each independently eligible trigger is considered; no arbitrary once-per-turn cap. | NOT RUN |
| C01-T11 | A hero lands on a Chest, then is moved away by a pending hero reaction. | **PROVISIONAL: NO.** Cancel the Chest activation; evaluate the final destination after reactions. | NOT RUN |
| C01-T13 | Two heroes have pending special-space activations; the first activation moves its hero to another special space. | **PROVISIONAL:** Resolve the entire first chain, including new hero reactions and space effects, before the second hero's pending activation; recheck that second hero's position. | NOT RUN |
| C01-T14 | Reveal Shared Loot while Gnat is piggybacking; then resolve Root Quake or Dragon’s Breath with Gnat and carrier both targeted. | Gnat is eligible for global event effects, including beneficial ones, if the card targets Gnat; Piggyback creates no extra Altar activation or duplicate event effect. **PROVISIONAL (C01-T15-A):** A single global event moves Gnat once, with no Piggyback duplicate. | NOT RUN |
| C01-T15 | Gnat and a hero sharing his space are both at space 10 when Root Quake moves all heroes back 2 spaces. | **PROVISIONAL:** Both end at space 8. Gnat does not move an additional 2 spaces through Piggyback. Check any later independent movement separately. | NOT RUN |
| C01-T12 | A hero reaches FINISH while another forced movement or space effect remains pending. | **OPEN / C02:** Timing of exact finish, placement and race end. | NOT RUN |

## 8. Open points for final validation
- **O01 (provisionally resolved, C01-T11-A):** A pending space activation is cancelled if its hero leaves before resolution. Validate at the table.
- **O02 (provisionally resolved, C01-T07-A):** Teleport arrival can trigger occupancy/sharing abilities where their conditions hold. Verify actual simultaneous-swap outcomes for Inigo, Gronk, and third-party occupants at the table.
- **O03 (provisionally resolved, C01-T03-A):** A repeated relevant game state identifies an infinite cycle; test whether players can recognize this reliably without bookkeeping overhead.
- **O04:** Finish-line timing and the second finisher while other effects are pending (handoff to C02).
- **O05 (provisionally resolved, C01-T13-A):** Finish the current space-effect chain, including nested hero reactions and new destination effects, before other players' pending space effects. Validate with a worked tabletop example.
- **O06:** Mixed positive/negative space effects while Gnat is piggybacking (no such board trap currently specified).
- **O07 (provisionally resolved, C01-T14-A):** Global Altar events target Gnat normally; no extra Altar activation from Piggyback. **Provisionally resolved by C01-T15-A:** no double movement for a single simultaneous global event; physical validation pending.

## 9. Traceability / decision log
| Decision | Provisional rule | Evidence |
|---|---|---|
| C01-A | Abilities before spaces | User approval; resolves GDD priority conflict |
| C01.1 | Ability-added movement before destination space | User approval |
| C01.2 | Hero reaction chains before spaces | User approval |
| C01.3-B | Gnat: no beneficial spaces, harmful traps apply | User approval |
| C01.4-A | Vespera forced movement can chain | User approval |
| C01.5-A | Gronk ejects other heroes | User approval |
| C01.6-A | Inigo does not interrupt ongoing abilities | User approval |
| C01.7 | Active player, then clockwise for simultaneous abilities | User approval |
| C01.8-A | Warp swaps simultaneously; no passing | User approval |
| C01.9-A | Resolve infinite cycle once then stop repeating | User approval |
| C01.10-A | Ability-forced movement activates destination spaces | User approval |
| C01.11-A | START is permanent exception for Gronk | User approval |
| C01.12-A | Trap-forced movement activates destination spaces | User approval |
| C01.13-A | Simultaneous space effects: active player, then clockwise | User approval |
| C01-T11-A | Only final position after hero reactions activates destination space; cancel unprocessed prior-space activation | User approval |
| C01-T07-A | Teleport arrival may trigger occupancy/sharing abilities when their conditions actually hold | User approval |
| C01-T13-A | Finish a space-effect chain before the next player's pending space effect; recheck pending eligibility | User approval |
| C01-T03-A | Identify an infinite loop by recurrence of the same relevant game state, including positions, conditions and pending effects | User approval |
| C01-T14-A | Gnat is eligible for global Altar events according to card targeting; Piggyback gives no extra Altar activation or duplicate event effect | User approval |
| C01-T15-A | A global event moving Gnat and carrier simultaneously moves Gnat once; no additional Piggyback movement for same event | User approval |
| C01-T16-A | Different movements assigned to Gnat and carrier by the same event resolve separately, without additional Piggyback | User approval |
| C01-T01-A | Vespera measures Grave Embrace range immediately before her forced backward movement | User approval |
| C01-PKG-P-A | Pixie reacts once per distinct eligible power activation, including legitimate repeats | User approval |
| C01-PKG-G-A | Gronk ejection is forced movement triggering eligible abilities and destination spaces | User approval |
| C01-PKG-I-A | Inigo duel requires actual shared occupancy after relevant movement/effect, not transit | User approval |

**GDD reference:** `GDD_Master_Specifications.md`, section 4 (*Turn Sequence* and *Strict Reaction Priority*), section 6 (hero abilities), and sections 7–8 (Chest/Altar effects). The source GDD contains a conflict between turn sequence and strict reaction priority. This draft follows the decisions above; it is not presented as original source text.

## 10. Next steps
1. Validate open points with targeted tabletop examples and user decisions.
2. Print the quick reference and run the 16 physical test scenarios; log actual outcomes.
3. Approve a final C01 chapter, then audit C02 (movement and finish).
4. Build a local browser prototype and automated rule tests after rules consolidation, then use the verified engine to inform physical Print & Play production and human playtests.

## 11. C01-T09 — Source card audit (reviewed; no new rule approved)
- **GDD §5:** Spikes/Blades/Anchors cause backward movement; Pitfall/Chains/Lava cause backward movement plus Tripped. No listed board trap combines a positive and a negative consequence. Exact space-specific values are not supplied for every trap.
- **GDD §7:** *Cursed Chest* (Level 3 Action) says “Draw 2 Chest cards, but recede 2 spaces immediately.” This is a mixed-effect **played Action card**, not a board trap; the GDD does not state that a piggybacking Gnat shares the card's effect.
- **GDD §8:** *Molten Gold* (Level 4 Altar) says “1st place hero loses 2 Trophy Points, but moves +2 spaces.” This is a mixed-effect **global event**, targeted at the leader; whether Gnat is also affected must follow the eventual event-targeting rule, not be assumed from piggybacking. *Gust of Wind* has opposite effects on different targets, not mixed effects on the same target.
- **Finding:** The hypothetical beneficial-and-harmful trap used to motivate C01-T09 is **not present in the current GDD**. No extra split-effects rule is approved. Existing C01.3-B stands; event targeting and card sharing require a separate audit if relevant.
- **Status:** Document review completed; tabletop playtest NOT RUN; GDD unchanged.

## 12. C01-T14 — Global Altar events and Gnat (provisionally approved)
**Approved English wording:** “Gnat is affected by global Altar events whenever he meets the targeting conditions stated on the card, just like any other hero. Piggyback does not trigger an additional Altar activation or duplicate an event’s effects.”

**Examples from GDD §8:** Shared Loot (all heroes draw), Root Quake (all heroes move backward), Gust of Wind (leader/last), Public Execution (first), Molten Gold (first), Dragon’s Breath (all heroes on the specified result). Each targets Gnat only if its printed targeting condition applies. The approval does not determine how to process Piggyback when a global event moves Gnat and carrier simultaneously.

**Status:** 19 provisional decisions. Scenario C01-T14 NOT RUN. Original GDD unchanged.

## 13. C01-T16 — Different movements assigned by a single event (provisionally approved)
**Decision C01-T16-A:** If a single card or event assigns different movements to Gnat and a hero sharing his space, each hero resolves only the movement assigned to them. Piggyback does not grant additional movement from the same event. They may end on different spaces. A later independent movement may trigger Piggyback normally.

**Approved English wording:** “If a single event assigns different movements to Gnat and a hero sharing his space, each hero resolves only the movement assigned to them. Piggyback does not grant additional movement from that same event. The heroes may end on different spaces. A later, independent movement may trigger Piggyback normally.”

**GDD §7 example — Dragon Sacrifice:** Carrier and Gnat start at space 15. Carrier plays Dragon Sacrifice, moving backward 2 to space 13; Gnat is another hero and moves backward 4 to space 11. These are positions before subsequent reactions and destination effects. No extra Piggyback movement is granted by Dragon Sacrifice.

**Test C01-T16:** Set up the example above, resolve the card and all resulting reactions and destination spaces. Expected: Gnat does not gain an additional Piggyback movement from the same card. **NOT RUN.**

**Traceability:** C01-T16-A — user approval; related C01-T14-A and C01-T15-A. **Decision count at v1.0: 21 provisional. Current count at v1.1: 25 provisional.** Original GDD unchanged.


## 14. Consistency review (document review only; no physical tests)
- **PASS — C01-A vs GDD:** The GDD Turn Sequence lists hero triggers before board spaces, but Strict Reaction Priority lists board spaces first. C01-A deliberately selects hero triggers first; original GDD remains unchanged.
- **PASS — C01-T11 vs C01.12:** An unprocessed landing is cancelled if the hero moves away during reactions; once a trap effect actually begins, its forced movement can trigger a new destination.
- **PASS — C01.13 vs C01-T13:** Player order selects the first pending space effect; its nested chain finishes before moving to the next pending player.
- **PASS — C01-T14/T15/T16:** Gnat is independently eligible for global targeting; movement assigned by a single event is not duplicated by Piggyback.
- **PROVISIONALLY RESOLVED — Inigo occupancy:** Passing through a space does not qualify; shared occupancy after the movement/effect is required (C01-PKG-I-A).
- **PROVISIONALLY RESOLVED — Gronk displacement:** Ejection is forced movement and can trigger eligible hero abilities and destination effects (C01-PKG-G-A). Edge cases with Gnat and cascades still need testing.
- **PROVISIONALLY RESOLVED — Pixie counting:** One movement per distinct eligible activation, including repeated activations; simultaneous-trigger ordering and movement/caster-passing bonus timing need concrete tests (C01-PKG-P-A).
- **OPEN — Finish timing:** Resolve in C02, including pending chains and second finisher.
- **OPEN — Loop detection at table:** Relevant-state criterion is approved, but practical recognition needs tabletop validation.

**Scenario inventory:** T01–T11 (11 scenarios), T12 (1), T13–T16 (4) = **16 distinct scenarios**, all NOT RUN.


## 15. C01 consolidated clarification package — approved provisionally (v1.1)

| ID | English ruling | Related existing decisions | Validation |
|---|---|---|---|
| C01-PKG-P-A | Pixie moves once per distinct eligible activation of **another** power, including legitimate repeated activations; do not count a resulting movement as a new activation of the same power. | C01.2, C01.7, C01.9-A, C01-T03-A | NOT RUN |
| C01-PKG-G-A | Gronk's one-space ejection is forced movement. It may trigger other hero abilities and destination-space effects. | C01.5-A, C01.10-A, C01.11-A, C01-T11-A | NOT RUN |
| C01-PKG-I-A | Inigo may duel only when actual shared occupancy exists after the relevant movement/effect completes; passing through does not qualify. | C01.6-A, C01-T07-A | NOT RUN |

### Consistency / collision audit (not a playtest)
- **No direct reversal of an approved C01 decision detected.** All three clarifications refine earlier choices rather than replace them.
- **GDD vs provisional design — Gronk:** GDD §6 explicitly covers a hero landing on Gronk and being moved back one space; the broader rule ejecting occupants when Gronk arrives, and the new chain-trigger semantics, are approved *extensions*, not verbatim GDD wording. Record these as intentional deviations.
- **GDD vs provisional design — Pixie:** “Whenever another power triggers” supports repeated *other-power* activations; Pixie's own power must not trigger itself. What counts as one activation, and the exact ordering when several trigger simultaneously, require executable examples.
- **GDD vs provisional design — Inigo:** “Sharing a space” supports an occupancy requirement; whether the ability can repeat without a new sharing event, and how to handle several eligible occupants, remain unspecified. This is an OPEN issue, not approval for repeated free duels.
- **C01-PKG-G-A + C01-T11-A:** An ejected hero's former destination activation is cancelled if still unprocessed; evaluate the new final space after reactions. Compatible in principle, but must be tested with Gronk chains and Gnat.
- **C01-PKG-P-A + C01.9-A:** Legitimate repeated Pixie triggers remain allowed, but the repeated-relevant-state loop guard still applies. No unlimited self-trigger.
- **C01-PKG-I-A + C01-T07-A:** Warp's simultaneous teleport can create shared occupancy with a third party, but never counts as merely passing through.
- **Other OPEN dependencies:** Exact finish/second finisher (C02); unambiguous ordering of nested simultaneous triggers; Inigo duel repeatability; exact special-space hazard parameters.

### Additional deterministic tests to implement (NOT RUN)
1. **P1 Pixie multiple triggers:** Chiron triggers Hoofstrike and Vespera triggers Grave Embrace; Pixie gets exactly one movement per independently eligible activation, without self-trigger.
2. **P2 Pixie same power repeats:** Two separate valid activations of one other hero power generate two Pixie movements, unless a true repeated-state loop is detected.
3. **G1 Gronk ejection:** A hero is ejected from Gronk's space onto a trap; reactions first, then the final eligible destination effect.
4. **G2 Gronk + Vespera:** Ejection moves Vespera backward; measure Grave Embrace from her pre-ejection position.
5. **I1 Inigo transit:** A hero passes through Inigo's space but stops elsewhere: no duel.
6. **I2 Inigo landing:** A hero finishes on Inigo's space and remains there after the current effect: a duel may be declared, subject to the exact ability's conditions.
7. **I3 Inigo + Warp:** A simultaneous swap produces no duel between the two swapped heroes solely by exchanging places; a third-party occupant can create eligibility.

**Status:** 25 provisional C01 decisions (21 at v1.0 + C01-T01-A + 3 package approvals). Zero physical tests; zero executable tests or bot simulations run for this update. Original GDD unchanged. The user now prioritizes a local browser testbed and automated simulations before final Print & Play production.


## Cross-chapter update — Chest / Altar timing (2026-10-22)

**USER-APPROVED PROVISIONAL:** Chest **Action** and **Reaction** types remain distinct, with separate timing windows. An eligible final landing on an **Altar**, including one caused by ability- or trap-forced movement, draws one Altar card from the current Dungeon level; reveal/read aloud and resolve its event immediately. Mere passage does not activate an Altar. C01 hero-reaction-first and final-destination eligibility rules remain in force; C02 immediate second-finisher race end interrupts unprocessed effects. See `C01_C02_Chest_Altar_Timing_v0.2_EN.md`, CA-01–CA-09 and CA-T01–CA-T12. This update does not claim executed tests.
