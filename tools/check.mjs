import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(root, "config/repository.json"), "utf8"));
assert.equal(config.schema_version, 1);
assert.equal(config.repository, path.basename(root));
assert.equal(config.main_repository, config.organization + ".github.io");
assert.equal(config.protocol_version, 1);
if (config.role === "runtime-shard") {
  assert([0, 1].includes(config.shard_index));
  assert.equal(config.first_pack, config.shard_index * 256);
  assert.equal(config.last_pack, config.first_pack + 255);
  assert.equal(config.pack_count, 256);
  assert.equal(config.max_pack_bytes, 2228256);
  assert(config.max_pack_bytes * config.pack_count < config.max_site_bytes);
  assert.equal(config.site_base, "https://" + config.organization + ".github.io/" + config.repository);
} else {
  assert.equal(config.role, "unity-world");
  assert.equal(config.target_platform, "windows_pc_pcvr");
  assert.equal(config.catalog_url, "https://" + config.organization + ".github.io/catalog.json");
  assert.equal(config.data_site_bases.length, 2);
}
// The imported fixed address list must match this repository's endpoint configuration exactly.
const manifestPath = path.join(root, "config/addresses.json");
assert(fs.existsSync(manifestPath), "config/addresses.json missing; regenerate it with the main repository manifest builder");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
assert.equal(manifest.schema, 1);
assert.equal(manifest.protocol_version, config.protocol_version);
assert.equal(manifest.layout_version, config.layout_version);
assert.deepEqual(manifest.counts, { catalog: 1, regions: 64, packs: 512, total: 577 });
assert.equal(new Set([manifest.catalog, ...manifest.regions, ...manifest.packs]).size, 577);
assert.equal(manifest.catalog, config.catalog_url);
manifest.regions.forEach((url, region) => assert.equal(url, config.regions_base + "/" + String(region).padStart(2, "0") + ".json"));
manifest.packs.forEach((url, index) => {
  const shard = Math.floor(index / 256);
  assert(url.startsWith(config.data_site_bases[shard] + "/packs/"), "pack " + index + " served by wrong shard");
  assert(url.endsWith(String(index).padStart(3, "0") + ".bin"), "pack " + index + " address does not match its index");
});
for (const file of ["README.md", "LICENSE", ".gitignore"]) assert(fs.existsSync(path.join(root, file)));
console.log("PASS " + config.repository + " role, protocol, endpoint and 577 fixed addresses");
