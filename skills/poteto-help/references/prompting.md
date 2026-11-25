# Word the prompt

Give Pi the goal, a check that can fail, and the evidence you want back. Include any constraint that changes a decision: “don't edit yet,” “keep output byte-identical,” or “stop before publishing.” Include a repro or fixture when you have one. Leave room to find a better fix than your first guess.

- **Missing context:** ask `/skill:recall` about one topic and time window in this workspace. For unfamiliar code, ask `/skill:how` to trace the path.
- **Design choice:** ask for two prototypes on the same fixture and name the observable difference that matters. Review evidence before committing to a plan.
- **Stepping away:** specify permitted actions, a finish check and a stop condition. Don't assume background execution or an unattended runner.
- **Drift:** “The goal was to reproduce it, not fix it. Show the failing output and stop.”
