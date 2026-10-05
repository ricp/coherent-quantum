# Research-history review tools

Run from the repository root. These tools preserve the independent review's deterministic and isolated-native checks. Browser tools require the installed `agent-browser` CLI and use their own sessions; do not point them at a human player's origin/session. Their fixture imports are QA, not proof of an earned normal-browser campaign.

Create a scratch directory outside Git, then generate strictly parsed public-action fixtures and two legal pacing routes:

```sh
mkdir -p /tmp/coherent-history-qa
node analysis-tools/research-history/research-history-gameplay-probe.cjs . /tmp/coherent-history-qa/pacing.json /tmp/coherent-history-qa
```

Serve this repository in a separate terminal:

```sh
python3 -m http.server 5586 --bind 127.0.0.1
```

Run the isolated native matrix and the automated/manual maintenance keyboard route:

```sh
node analysis-tools/research-history/research-history-browser-review.cjs . /tmp/coherent-history-qa
node analysis-tools/research-history/research-history-focus-review.cjs . /tmp/coherent-history-qa
```

The broad tool optionally accepts a private earned pre-extension ending export as its sixth argument for the legacy-ending/opt-in check. Without that argument the legacy branch is not run; the saved review evidence identifies the actual case it executed. Never use a human player's export as disposable QA. The tool does not fabricate a legacy earned ending. Raw generated exports remain outside Git.

The saved native matrix in `evidence/research-history/` ran before the final one-site maintenance focus correction. Its separately saved four-case focus matrix identifies the final app hash. Moving the scripts into this nested directory changes only their default repository path; the earlier evidence retains its actual source hashes and scope.

The geometry audit executes the actual cable helper and route declarations with the checked-in Three.js bundle. It checks rendered tube clearance above the floor and preservation of the replay curve's default interpolation:

```sh
node analysis-tools/research-history/campus-cable-clearance-qa.cjs
```
