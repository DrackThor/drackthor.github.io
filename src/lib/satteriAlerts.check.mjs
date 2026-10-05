/**
 * Self-check for alert marker detection.
 * Run: node src/lib/satteriAlerts.check.mjs   (also run by `make test`)
 */
import assert from "node:assert/strict";
import satteriAlerts, { ALERT_TYPES, alertTypeOf } from "./satteriAlerts.mjs";

// Every supported type is recognised, in any case.
for (const type of ALERT_TYPES) {
  assert.equal(alertTypeOf(`[!${type.toUpperCase()}]`), type);
  assert.equal(alertTypeOf(`[!${type}]`), type);
}

// Leading whitespace from the surrounding blockquote is tolerated.
assert.equal(alertTypeOf("\n  [!NOTE]\nbody"), "note");

// Non-alerts stay non-alerts.
for (const text of [
  "[!BOGUS]",
  "see [!NOTE] below",
  "Just a quotation.",
  "",
  null,
  undefined,
]) {
  assert.equal(alertTypeOf(text), null, `should not match: ${text}`);
}

// The plugin tags a matching blockquote and leaves others untouched.
const plugin = satteriAlerts();
const calls = [];
const ctx = {
  textContent: (node) => node.text,
  setProperty: (node, key, value) => calls.push([node.id, key, value]),
};

plugin.element.visit({ id: "a", text: "[!WARNING]" }, ctx);
plugin.element.visit({ id: "b", text: "ordinary quote" }, ctx);

assert.deepEqual(calls, [["a", "className", "md-alert md-alert-warning"]]);
assert.deepEqual(plugin.element.filter, ["blockquote"]);

console.log("satteriAlerts: all checks passed");
